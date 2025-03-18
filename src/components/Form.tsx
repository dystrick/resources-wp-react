"use client";

import { useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useResourcesContext } from "@/components/Provider";
import { colorSchemeMap } from "@/lib/helpers";

// @ts-ignore
import HubspotForm from "react-hubspot-form";

const DURATION = 3000;

const Form = ({
  className,
  provider,
  success_message,
  resource,
  config,
  colorScheme,
  onComplete,
}: {
  className: string;
  provider: string;
  success_message: string;
  resource: string;
  config: any;
  colorScheme: string;
  onComplete: (success: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const { client } = useResourcesContext();

  const onSubmit = async (data: any) => {
    if (provider === "wordpress") {
      await client.sendEmail({
        send_to: config.email_addresses,
        email_address: data.emailAddress,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        company: data.companyName,
        resource: resource,
        // message: {
        //   "First Name": data.firstName,
        //   "Last Name": data.lastName,
        //   "Phone Number": data.phoneNumber,
        //   Company: data.companyName,
        // },
      });
    }

    if (provider === "hubspot") {
      // https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formGuid
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: success_message,
          status: "success",
          duration: DURATION,
          isClosable: true,
          position: "bottom",
        });

        onComplete(true);

        return resolve(true);
      }, DURATION);
    });
  };

  if (provider === "wordpress") {
    return (
      <Box
        className={`wp-resources-pro-form ${className}`}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box mb={10}>
          <FormControl
            id="email-address"
            mb={3}
            isInvalid={!!errors["emailAddress"]}
          >
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              {...register("emailAddress", {
                required: true,
              })}
            />
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
          </FormControl>
          <Stack direction={["column", "row"]} spacing={3} mb={3}>
            <FormControl id="first-name" isInvalid={!!errors["firstName"]}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                {...register("firstName", {
                  required: true,
                })}
              />
            </FormControl>
            <FormControl id="last-name" isInvalid={!!errors["lastName"]}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                {...register("lastName", {
                  required: true,
                })}
              />
            </FormControl>
          </Stack>
          <FormControl
            id="phone-number"
            mb={3}
            isInvalid={!!errors["phoneNumber"]}
          >
            <FormLabel>Phone Number</FormLabel>
            <Input type="tel" {...register("phoneNumber")} />
          </FormControl>
          <FormControl
            id="company-name"
            mb={3}
            isInvalid={!!errors["companyName"]}
          >
            <FormLabel>Company</FormLabel>
            <Input type="text" {...register("companyName")} />
          </FormControl>
        </Box>

        <Stack
          direction={["column-reverse", "row"]}
          spacing="6"
          justify="center"
        >
          <Button
            type="submit"
            colorScheme={colorScheme}
            isLoading={isSubmitting}
            loadingText="Submitting"
            color={colorSchemeMap(colorScheme)}
            minW="150px"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    );
  }

  if (provider === "hubspot") {
    return (
      <HubspotForm
        portalId={config.portal_id}
        formId={config.form_id}
        onSubmit={() => onSubmit({})}
        // onReady={(form) => {}}
        // loading={<div>Loading...</div>}
      />
    );
  }

  return null;
};

export default Form;
