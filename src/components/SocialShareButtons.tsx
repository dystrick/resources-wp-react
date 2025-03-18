import { isEmpty } from "lodash";
import {
  EmailShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  EmailIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
} from "react-share";
import {
  Box,
  Flex,
  Stack,
  Text,
  Icon,
  Tooltip,
  type StackProps,
} from "@chakra-ui/react";

interface SocialShareButtonsProps extends StackProps {
  url: string;
  buttons: string[];
}

const SocialShareButtons = ({
  url,
  buttons,
  ...props
}: SocialShareButtonsProps) => {
  if (!url || isEmpty(buttons)) return null;

  return (
    <Stack align="center" direction="row" spacing={3} my={2} {...props}>
      <Text fontWeight="bold">Share: </Text>
      <Flex
        as="ul"
        listStyleType="none"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {buttons.includes("email") && (
          <Box as="li" m={2}>
            <Tooltip label="Email">
              <EmailShareButton url={url}>
                <Icon as={EmailIcon} w={8} h={8} />
              </EmailShareButton>
            </Tooltip>
          </Box>
        )}

        {buttons.includes("twitter") && (
          <Box as="li" m={2}>
            <Tooltip label="Twitter">
              <TwitterShareButton url={url}>
                <Icon as={TwitterIcon} w={8} h={8} />
              </TwitterShareButton>
            </Tooltip>
          </Box>
        )}

        {buttons.includes("linkedin") && (
          <Box as="li" m={2}>
            <Tooltip label="LinkedIn">
              <LinkedinShareButton url={url}>
                <Icon as={LinkedinIcon} w={8} h={8} />
              </LinkedinShareButton>
            </Tooltip>
          </Box>
        )}

        {buttons.includes("facebook") && (
          <Box as="li" m={2}>
            <Tooltip label="Facebook">
              <FacebookShareButton url={url}>
                <Icon as={FacebookIcon} w={8} h={8} />
              </FacebookShareButton>
            </Tooltip>
          </Box>
        )}
      </Flex>
    </Stack>
  );
};

export default SocialShareButtons;
