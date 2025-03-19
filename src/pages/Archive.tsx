"use client";

import { isEmpty } from "lodash";
import {
  Box,
  Container,
  Grid,
  Flex,
  Text,
  Stack,
  Checkbox,
  Input,
  Button,
} from "@chakra-ui/react";
import Message from "@/components/Message";
import Hero from "@/components/Hero";
import Card, { SkeletonCard } from "@/components/Card";
import { getDateStatus, colorSchemeMap } from "@/lib/helpers";
import Pagination from "@/components/Pagination";

import { useRef, useState, useEffect } from "react";
import { useResourcesContext } from "@/components/Provider";
import { useResources, useCategories } from "@/hooks/queries";

export function Archive() {
  const topRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { basePath, client, settings } = useResourcesContext();

  const { resources, pageCount, error, isLoading, refetch } =
    useResources(client);
  const { categories: categoryData } = useCategories(client);
  console.log(categoryData);

  useEffect(() => {
    refetch({ categories, search, paged: currentPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, search, currentPage]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (categories.includes(e.target.value)) {
      setCategories(
        categories.filter((category) => category !== e.target.value)
      );
    } else {
      setCategories([...categories, e.target.value]);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch((e.target as HTMLFormElement).search.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    if (topRef.current) {
      window.scrollTo({
        top: topRef.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  if (error) return <Message message="Error... please refresh your browser." />;

  return (
    <Box className="wp-resources-pro-archive">
      {settings && settings.archive_header_enabled && (
        <Hero
          className="wp-resources-pro-archive__hero"
          kicker={settings.archive_header_kicker}
          title={settings.archive_header_title}
          content={settings.archive_header_content}
          color={settings.archive_header_font_color}
          bgColor={settings.archive_header_background_color}
          bgImage={settings.archive_header_background_image}
        />
      )}

      <Container maxW="1440px" py={20}>
        <Flex
          className="wp-resources-pro-archive__filters"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          mb={6}
        >
          <Stack
            className="wp-resources-pro-archive__filter"
            flex="1 1 60%"
            direction="row"
            spacing={4}
            wrap="wrap"
            alignItems="center"
            my={2}
          >
            {categoryData && categoryData.length > 1 && (
              <>
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight="bold"
                  w={["100%", "auto"]}
                >
                  Filter by:
                </Text>
                {categoryData
                  .filter(({ parent, count }) => parent === 0 && count !== 0)
                  .map((category) => {
                    return (
                      <Checkbox
                        key={category.id}
                        colorScheme={settings.theme_color_scheme || "blue"}
                        size="md"
                        borderColor="gray.100"
                        _hover={{
                          ".chakra-checkbox__input:not(:checked) + .chakra-checkbox__control":
                            {
                              bg: `${settings.theme_color_scheme}.200`,
                            },
                        }}
                        name={category.slug}
                        value={category.id}
                        onChange={handleFilter}
                      >
                        {category.name}
                      </Checkbox>
                    );
                  })}
              </>
            )}
          </Stack>

          <Box
            className="wp-resources-pro-archive__search"
            as="form"
            my={2}
            onSubmit={handleSearch}
          >
            <Flex>
              <Input
                type="text"
                name="search"
                placeholder="Keywords..."
                size="sm"
                my="0 !important"
                borderRadius={3}
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
              />
              <Button
                type="submit"
                size="sm"
                colorScheme={settings.theme_color_scheme}
                color={colorSchemeMap(settings.theme_color_scheme)}
                ml="-1px"
                px={6}
                borderRadius={3}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
              >
                Search
              </Button>
            </Flex>
          </Box>
        </Flex>

        {!isLoading && isEmpty(resources) && (
          <Message
            className="wp-resources-pro-archive__empty"
            message="Sorry, we couldn't find any results. Please try another query."
          />
        )}

        <Grid
          className="wp-resources-pro-archive__list"
          templateColumns="repeat(auto-fill, minmax(272px, 1fr))"
          gap="20px"
          mb={10}
          ref={topRef}
        >
          {isLoading &&
            [...Array(8).keys()].map((_, index) => (
              <SkeletonCard key={index} />
            ))}

          {resources &&
            !isEmpty(resources) &&
            resources.map((resource) => {
              const { created_at, updated_at } = resource;
              const dateStatus = getDateStatus(created_at, updated_at);
              const resourceParentCategories = resource.categories.filter(
                ({ parent }: { parent: number }) => parent === 0
              );

              return (
                <Card
                  key={resource.id}
                  className="wp-resources-pro-archive__list-item"
                  href={
                    basePath ? `${basePath}/${resource.slug}` : resource.slug
                  }
                  image={resource.image}
                  title={resource.title}
                  description={resource.description}
                  status={dateStatus}
                  categories={resourceParentCategories}
                  cursor="pointer"
                  colorScheme={settings.theme_color_scheme}
                />
              );
            })}
        </Grid>

        <Pagination
          className="wp-resources-pro-archive__pagination"
          pages={pageCount}
          currentPage={currentPage}
          onValueChange={(page) => handlePageChange(page)}
        />
      </Container>
    </Box>
  );
}
