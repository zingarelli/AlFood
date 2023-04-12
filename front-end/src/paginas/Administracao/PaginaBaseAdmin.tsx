import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

const PaginaBaseAdmin = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6" sx={{
                            // mr: margin-right
                            mr: 3
                        }}>
                            Administração
                        </Typography>
                        <Box sx={{
                            display: 'flex'
                        }}>
                            <Link component={RouterLink} to={'/admin/restaurantes'}>
                                <Button sx={{
                                    // my = vertical margin
                                    my: 2,
                                    color: 'white'
                                }}>Listar Restaurantes</Button>
                            </Link>
                            <Link component={RouterLink} to={'/admin/restaurantes/novo'}>
                                <Button sx={{
                                    // my = vertical margin
                                    my: 2,
                                    color: 'white'
                                }}>Novo Restaurante</Button>
                            </Link>
                            <Link component={RouterLink} to={'/admin/pratos'}>
                                <Button sx={{
                                    // my = vertical margin
                                    my: 2,
                                    color: 'white'
                                }}>Listar Pratos</Button>
                            </Link>
                            <Link component={RouterLink} to={'/admin/pratos/novo'}>
                                <Button sx={{
                                    // my = vertical margin
                                    my: 2,
                                    color: 'white'
                                }}>Novo Prato</Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{ 
                    // mt: margin-top
                    mt: 1 
                }}>
                    <Paper sx={{
                        // p: padding
                        p: 2
                    }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaBaseAdmin