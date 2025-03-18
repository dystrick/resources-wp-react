"use client";

import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useResourcesContext } from "@/components/Provider";
import { useResource } from "@/hooks/queries";
import {
  Box,
  Container,
  Heading,
  Image,
  Badge,
  SimpleGrid,
  Stack,
  Link,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { getDateStatus } from "@/lib/helpers";
import Message from "@/components/Message";
import Hero from "@/components/Hero";
import Form from "@/components/Form";
import Assets from "@/components/Assets";
import SocialShareButtons from "@/components/SocialShareButtons";

export function Single({ slug }: { slug: string }) {
  const [show, setShow] = useState(false);
  const { basePath, client, settings } = useResourcesContext();
  const { resource, error, isLoading } = useResource(client, slug);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <Message message="Error... please refresh your browser." />;

  return (
    <Box className="wp-resources-pro-single">
      {settings && settings.single_header_enabled && (
        <Hero
          className="wp-resources-pro-single__hero"
          kicker={settings.single_header_kicker}
          title={settings.single_header_title}
          content={settings.single_header_content}
          color={settings.single_header_font_color}
          bgColor={settings.single_header_background_color}
          bgImage={settings.single_header_background_image}
        />
      )}
      <Container
        className="wp-resources-pro-single__container"
        maxW="900px"
        py={20}
      >
        <Stack
          className="wp-resources-pro-single__breadcrumbs"
          spacing={10}
          direction="row"
          mb={3}
        >
          <Link
            as={RouterLink}
            to={basePath || `/`}
            color="gray.600"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
            display="inline-flex"
            alignItems="center"
            mb={3}
          >
            <ChevronLeftIcon w={4} h={4} mr={1} /> All Resources
          </Link>
        </Stack>
        {resource && (
          <Box>
            <SimpleGrid
              className="wp-resources-pro-single__header"
              minChildWidth={["100%", "430px"]}
              spacing="40px"
              mb={10}
            >
              {resource.image && resource.image.url && (
                <Box
                  className="wp-resources-pro-single__image"
                  h="280px"
                  bgColor="gray.50"
                  bgRepeat="no-repeat"
                  bgPosition="center"
                  borderRadius={3}
                  style={{
                    backgroundImage: `url('${resource.image.url}')`,
                    backgroundSize: resource.image.background_size,
                  }}
                >
                  <Image
                    src={resource.image.url}
                    alt={resource.image.alt}
                    display="none"
                  />
                </Box>
              )}

              <Box>
                <Box
                  className="wp-resources-pro-single__meta"
                  display="flex"
                  alignItems="center"
                  mb={2}
                >
                  {resource.created_at && resource.updated_at && (
                    <Badge
                      className="wp-resources-pro-single__status"
                      colorScheme={settings.theme_color_scheme}
                      mr={6}
                      mb={3}
                      px={4}
                      py={1}
                      borderRadius={3}
                    >
                      {getDateStatus(resource.created_at, resource.updated_at)}
                    </Badge>
                  )}

                  {resource.categories && (
                    <Box
                      className="wp-resources-pro-single__categories"
                      color="gray.600"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      mb={3}
                    >
                      {resource.categories.map((category, index) => (
                        <span key={index}>
                          {index ? " • " : ""}
                          {category.name}
                        </span>
                      ))}
                    </Box>
                  )}
                </Box>

                {resource.title && (
                  <Heading
                    className="wp-resources-pro-single__title"
                    as="h1"
                    color="gray.700"
                    mb={2}
                  >
                    {resource.title}
                  </Heading>
                )}

                {resource.description && resource.form.enabled && !show && (
                  <Box
                    className="wp-resources-pro-single__description"
                    color="gray.600"
                    dangerouslySetInnerHTML={{ __html: resource.description }}
                  />
                )}

                <SocialShareButtons
                  className="wp-resources-pro-single__social-share"
                  url={window.location.href}
                  buttons={resource.social_share_buttons}
                  mt={6}
                  mb={0}
                />
              </Box>
            </SimpleGrid>

            <Box className="wp-resources-pro-single__body">
              {resource.form.enabled && !show && (
                <Box className="wp-resources-pro-gate">
                  <Heading
                    className="wp-resources-pro-gate__title"
                    as="h3"
                    color="gray.600"
                    fontSize="2xl"
                    textAlign="center"
                    maxW="360px"
                    m="0 auto"
                    mb={6}
                  >
                    {resource.form.title}
                  </Heading>
                  <Form
                    className="wp-resources-pro-gate__form"
                    {...resource.form}
                    resource={resource.title}
                    colorScheme={settings.theme_color_scheme}
                    onComplete={setShow}
                  />
                </Box>
              )}

              {(!resource.form.enabled || show) && (
                <Assets
                  className="wp-resources-pro-single__assets"
                  colorScheme={settings.theme_color_scheme}
                  assets={resource.assets}
                />
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
