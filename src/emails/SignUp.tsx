import {
  Body,
  Button,
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

export function SignUp({
  token,
  name,
  email,
}: {
  token: string;
  name: string;
  email: string;
}) {
  const activationUrl = `${baseUrl}/auth/verify-email?otp=${token}&email=${email}`;

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
        <Body className="bg-[#FBF4EE] w-full">
          <Container className="m-10">
            <Container className="flex flex-col gap-3">
              <Img
                src={`${baseUrl}/images/adora.png`}
                width="170"
                height="50"
                alt="Adora"
                className="flex items-center justify-center"
              />

              <Heading className="font-medium text-black-100 text-2xl py-3 font-satoshi">
                OTP Verification
              </Heading>
            </Container>
            <Container className="bg-white-100 py-20 rounded-lg flex flex-col items-center">
              <Text className="text-black-100 capitalize font-satoshi text-lg font-semibold pb-3">
                Hi {name},
              </Text>
              <Text className="pt-2 pb-3 text-sm font-normal font-satoshi">
                Welcome to Adora!
              </Text>

              <Text className="text-black-100 font-satoshi font-normal pb-3 text-lg">
                To activate your account, please use the following OTP:
              </Text>

              <Text className="text-black-100 font-satoshi font-bold text-3xl pb-3">
                {token}
              </Text>

              <Text className="text-black-100 font-satoshi font-normal pb-3 text-lg">
                or click the button below to activate your account
              </Text>

              <Button
                className="py-4 px-8 bg-[#00825F]  rounded-md text-[#fff] "
                href={activationUrl}
              >
                Activate Account{" "}
              </Button>

              <Text className="text-black-100 font-satoshi font-normal pb-3 text-lg">
                If you did not sign up to Adora or if you have any questions,
                please contact our support at adora@support.com
              </Text>
            </Container>

            <Container className="flex flex-col gap-3">
              <Text className="text-black-100 font-satoshi font-semibold text-lg pb-2">
                Uche Igbonachor
              </Text>
              <Text className="text-black-100 font-satoshi font-normal pb-3 text-lg">
                CEO, Adora Inc.
              </Text>

              <Section className="mt-5 bg-[rgba(0,130,95,0.12)] flex justify-center items-center" />
              <Text className="text-base pb-2 font-medium font-satoshi">
                Address: 734 States Street Mississauga
              </Text>

              <Text className="text-base pb-2 font-medium text-black-100 font-satoshi">
                Ontario. Canada L5R 0B6
              </Text>

              <Text className="font-satoshi font-normal text-base text-black-100">
                {" "}
                © {new Date().getFullYear()} Adora. All right reserved.
              </Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
