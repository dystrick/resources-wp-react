import {
  Box,
  BoxProps,
  Heading,
  Image,
  Badge,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

interface CardProps extends BoxProps {
  href: string;
  image: any;
  title: string;
  description: string;
  status: "New" | "Updated" | undefined;
  categories: any[];
  colorScheme: string;
}

export function SkeletonCard() {
  return (
    <Box borderWidth="1px" borderRadius={3}>
      <Skeleton h="140px" />
      <Box p="6">
        <Box display="flex" alignItems="center" mb={6}>
          <Skeleton w="80px" h="20px" mr="2" px={2} colorScheme="blue" />
          <Skeleton w="120px" h="8px" />
        </Box>
        <SkeletonText noOfLines={3} />
      </Box>
    </Box>
  );
}

function Card({
  className,
  href,
  image,
  title,
  description,
  status,
  categories,
  colorScheme,
}: CardProps) {
  return (
    <Box
      as="a"
      href={href}
      className={`wp-resources-pro-card ${className}`}
      textDecoration="none"
      borderWidth="1px"
      borderRadius={3}
      overflow="hidden"
    >
      <Box className="wp-resources-pro-card__header">
        <Box
          className="wp-resources-pro-card__image"
          position="relative"
          pb="60%"
          borderRadius={3}
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            w="100%"
            h="100%"
            bgColor="gray.50"
            bgRepeat="no-repeat"
            bgPosition="center"
            backgroundImage={image.url}
            backgroundSize={image.background_size}
            transform="translate(-50%, -50%)"
            transition="transform 1500ms ease"
            _hover={{
              transform: `translate(-50%, -50%) scale(1.1)`,
            }}
          >
            <Image src={image.url} alt={image.alt} display="none" />
          </Box>
          {status && (
            <Badge
              className="wp-resources-pro-card__status"
              position="absolute"
              zIndex="1"
              fontSize="xs"
              mt="8px"
              ml="8px"
              px={2}
              borderWidth="1px"
              colorScheme={colorScheme}
            >
              {status}
            </Badge>
          )}
        </Box>
      </Box>

      <Box className="wp-resources-pro-card__body" p="6">
        <Box
          className="wp-resources-pro-card__meta"
          display="flex"
          alignItems="baseline"
          mb={4}
        >
          {categories && (
            <Box
              className="wp-resources-pro-card__categories"
              color="gray.600"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              {categories.map((category, index) => (
                <span key={index}>
                  {index ? " • " : ""}
                  {category.name}
                </span>
              ))}
            </Box>
          )}
        </Box>

        {title && (
          <Heading
            className="wp-resources-pro-card__title"
            as="h2"
            color="gray.700"
            fontSize="2xl"
            fontWeight="semibold"
            lineHeight="tight"
            my={1}
          >
            {title}
          </Heading>
        )}

        {description && (
          <Box
            className="wp-resources-pro-card__description"
            noOfLines={3}
            color="gray.500"
            my={1}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </Box>
    </Box>
  );
}

export default Card;
