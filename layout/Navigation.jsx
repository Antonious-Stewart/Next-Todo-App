import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Navigation(){
  const router = useRouter();
  // const [anchorElNav, setAnchorElNav] = useState(null);
//   const pages = [{
//     create: {
//     path: "/todo/create",
//     title: "Create"
//   },
//   list: {
//     path: "/todo",
//   }
// }]
  // const handleOpenNavMenu = (event) => {
  // setAnchorElNav(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  // setAnchorElNav(null);
  // };

  return (
    <nav>
      <AppBar>
        <Container maxWidth="xl" sx={{ml: { xs: 0, lg: "auto"}}}>
          <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
            <Typography>
              <Link href="/">
                LOGO
              </Link>
            </Typography>
            {/* <Box>
              <Menu 
                open={Boolean(anchorElNav)}
                sx={{display: {xs: "block", lg: "none"}}} 
                onClose={handleCloseNavMenu}
                anchorEl={anchorElNav}
            >
              
            </Menu>
            </Box> */}

            <Box sx={{flexGrow: 0, display: {xs: "none", lg: "flex"}}}>
              <Button variant="outlined" sx={{color: "white", borderColor: "white"}} onClick={() => router.push("todo/create") }>
                <Typography>
                    Create
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  )
}