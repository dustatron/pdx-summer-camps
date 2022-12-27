import Link from "next/link";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as ChaLink,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = [
  { title: "Camps", route: "list" },
  { title: "About", route: "about" },
];

const NavLink = ({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) => (
  <ChaLink
    as={Link}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.50", "white"),
    }}
    href={route}
  >
    {children}
  </ChaLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: sessionData } = useSession();

  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            variant="ghost"
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href="/">
              <Box>Portland Kid Camps</Box>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.title} route={link.route}>
                  {link.title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          {sessionData && (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <Link href="add">
                    <MenuItem>Add Camp</MenuItem>
                  </Link>
                  <Link href="profile">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
          {!sessionData && <Button onClick={() => signIn()}> Login </Button>}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.title} route={link.route}>
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <nav className="relative mb-1 flex flex-wrap items-center justify-between bg-white px-1 py-2">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-8">
          <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <Link
              href="/"
              className="mr-4 inline-block whitespace-nowrap py-2 text-xl font-bold uppercase leading-relaxed text-black"
            >
              Portland Kid Camps
            </Link>
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <GiHamburgerMenu />
            </button>
          </div>
          <div
            className={
              "flex-grow items-center lg:flex" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
              <li className="nav-item">
                <Link href="/list">
                  <Button variant="ghost">Camp List</Button>
                </Link>
              </li>
              <li className="nav-item">
                <Button variant="ghost">About</Button>
              </li>
              <li className="nav-item">
                <Button
                  variant="ghost"
                  onClick={sessionData ? () => signOut() : () => signIn()}
                >
                  <>{sessionData ? "Sign out" : "Sign in"}</>
                </Button>
              </li>
              {sessionData && (
                <>
                  <li className="nav-item">
                    <Link href="/profile">
                      <Button variant="ghost">
                        {sessionData.user?.name}
                        <FaUserAlt className="ml-2" />
                      </Button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/add">
                      <Button variant="ghost">
                        Add Camp
                        <FaUserAlt className="ml-2" />
                      </Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
}
