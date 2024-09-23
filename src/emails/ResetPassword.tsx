import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { env } from "env.mjs";

const baseUrl = env.NEXT_PUBLIC_URL;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

export function ResetPassword({
  token,
  name,
}: {
  token: string;
  name: string;
}) {
  return (
    <Html>
      <Head />
      <Preview> Adora Password reset instructions</Preview>
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
        <Body style={main}>
          <Container className="px-6 py-4">
            <Img
              src={`${baseUrl}/images/logo.png`}
              width="170"
              height="50"
              alt="Adora"
              className="flex items-center justify-center"
            />
            <Text className="text-[#575757]">Hi {name},</Text>
            <Text className="py-2 text-sm font-normal font-poppins">
              Password reset instructions, if you didn&apos;t initiate this
              process, please change your password immediately.
            </Text>

            <Text className="text-[#575757] font-satoshi font-bold text-3xl pb-3">
              {token}
            </Text>
            <Hr />
            <Text className="text-xs font-normal font-poppins">
              408 Warren Rd - San Mateo, CA 94402
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
