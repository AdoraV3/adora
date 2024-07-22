import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { env } from "env.mjs";

const baseUrl = env.NEXT_PUBLIC_URL;

// const main = {
//   backgroundColor: "#ffffff",
//   fontFamily:
//     '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
// };

export function SignUp({ token, name }: { token: string; name: string }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Adora</Preview>
      <Tailwind
      // config={{
      //   theme: {
      //     extend: {
      //       colors: {
      //         "green.100": "#007291",
      //         "green.200": "#04A414",
      //         "green.300": "#00C217",
      //         "black.100": "#000",
      //         "white.100": "#fff",
      //       },
      //     },
      //   },
      // }}
      >
        <Body className="bg-white-100 w-full">
          <Container className="py-4">
            <Img
              src={`${baseUrl}/images/logo.png`}
              width="170"
              height="50"
              alt="Adora"
              className="flex items-center justify-center"
            />

            <Heading className="font-medium text-black-100 text-2xl py-3 font-satoshi">
              Verify this email address to complete sign up{" "}
            </Heading>
            <Text className="text-black-100 font-satoshi text-lg font-semibold pb-3">
              Hi {name},
            </Text>
            <Text className="pt-2 pb-3 text-sm font-normal font-satoshi">
              Welcome to Adora!,
            </Text>

            <Text className="text-black-100 font-satoshi font-normal pb-3 text-lg">
              To activate your account, please use the following OTP:
            </Text>

            <Text className="text-black-100 font-satoshi font-bold text-3xl pb-3">
              {token}
            </Text>

            <Text className="text-black-100 font-satoshi font-normal pb-3 text-lg">
              If you did not sign up to adora or if you have any questions,
              please contact our support at adora@support.com
            </Text>

            <Text className="text-black-100 font-satoshi font-semibold text-lg pb-2">
              Uche Igbonachor
            </Text>
            <Text className="text-black-100 font-satoshi font-normal pb-3 text-lg">
              CEO, Adora Inc.
            </Text>

            {/* <Button
              href={`${baseUrl}/auth/verify-email?token=${token}&email=${email}`}
              className="py-4 px-8 bg-[#00825F]  rounded-md text-[#fff] "
            >
              Activate Account
            </Button> */}

            <Section className="mt-5 bg-[rgba(0,130,95,0.12)] flex justify-center items-center" />
            <Text className="text-base pb-2 font-medium font-satoshi">
              Address: 734 States Street Mississauga
            </Text>

            <Text className="text-base  pb-2 font-medium text-black-100 font-satoshi">
              Ontario. Canada L5R 0B6
            </Text>

            <Text className="font-satoshi font-normal text-base text-black-100">
              {" "}
              © {new Date().getFullYear()} Adora. All right reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
