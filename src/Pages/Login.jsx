    import React, { useState } from 'react';
    import { Box, TextField, Button, Typography, Link, Card, CardContent, CardMedia } from '@mui/material';
    import { createTheme, ThemeProvider } from '@mui/material/styles';
    import { Link as RouterLink, useNavigate } from 'react-router-dom';
    // import TopNav from '../Components/Navbar/TopNav';

    // Validation functions
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/.test(password);

    const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
        mode: 'dark',
        },
        typography: {
        h5: {
            color: '#edc314',
        },
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleBlur = (e) => {
        validateField(e.target.name, e.target.value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
        case 'email':
            newErrors.email = isValidEmail(value) ? '' : 'Email must be a valid email address';
            break;
        case 'password':
            newErrors.password = isValidPassword(value) ? '' : 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
            break;
        default:
            break;
        }

        setErrors(newErrors);
    };

    const validate = () => {
        const newErrors = {};
        if (!isValidEmail(formData.email)) newErrors.email = 'Email must be a valid email address';
        if (!isValidPassword(formData.password)) newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
        const response = await fetch('https://autodiagsystemtest.runasp.net/api/Account/LoginUser', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }

        if (!response.ok) {
            setErrors({ form: data || 'Email not registered or incorrect password' });
            return;
        }

        console.log('User logged in:', data);
        console.log('Username:', data.userName);
        console.log('token:', data.token);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userName', data.userName); 
        navigate('/home/introduction');
        } catch (error) {
        console.error('There was an error logging in the user!', error);
        setErrors({ form: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
            paddingTop: '70px',
            overflow: 'hidden',
                    p: 2,
            }}
        >
            <Card sx={{ display: 'flex', width: '100%', maxWidth: '1200px', my: 'auto', flexDirection: { xs: 'column', md: 'row' }, borderRadius: '10px', height: '100%' }}>
            <CardMedia
                component="img"
                sx={{ width: { xs: '100%', md: '50%' }, height: { xs: 'auto', md: '100%' }, objectFit: 'cover' }}
                image="signup.jpg"
                alt="Login"
            />
            <CardContent sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2 }}>
                <Typography component="h1" variant="h4" sx={{ color: '#edc314', fontFamily: 'Helvetica' }}>
                Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.email}
                    helperText={errors.email}
                    placeholder="example@example.com"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.password}
                    helperText={errors.password}
                    placeholder="SuperUser.1"
                />
                {errors.form && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                    {errors.form}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                    mt: 3,
                    mb: 2,
                    width: '40%',
                    height: '45px',
                    fontWeight: 'bold',
                    mx: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '15px'
                    }}
                >
                    Login
                </Button>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Don't have an account? &nbsp;
                    <Link component={RouterLink} to="/">
                    Sign Up
                    </Link>
                </Typography>
                </Box>
            </CardContent>
            </Card>
        </Box>
        </ThemeProvider>
    );
    };

    export default Login;
