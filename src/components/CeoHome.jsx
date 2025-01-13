'use client'
import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CeoSection = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 5, md: 10 }, px: { xs: 2, md: 0 }, bgcolor: 'grey.200' }}>
      <Card sx={{ maxWidth: 1200, width: '100%', boxShadow: 3, borderRadius: 4, overflow: 'hidden' }}>
        <Grid container>
          {/* CEO Image and Qualifications */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'start' },
              py: 5,
              px: { xs: 2, md: 5 },
            }}
          >
            <CardMedia
              component="img"
              src="/teste-cursos.jpg"
              alt="Foto do CEO"
              sx={{
                width: { xs: '80%', md: '100%' },
                height: 'auto',
                borderRadius: 2,
                mb: 3,
                objectFit: 'cover',
                alignSelf: 'center',
              }}
            />
            <Typography variant="h6" gutterBottom>
              Qualificações
            </Typography>
            <List>
              {["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"].map((item, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <CheckCircleIcon
                      sx={{
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.2)',
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ color: 'white', textAlign: { xs: 'center', md: 'left' } }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* CEO Biography */}
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              p: { xs: 3, md: 5 },
              animation: 'fadeIn 0.5s ease-in-out',
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Biografia do CEO
            </Typography>
            <CardContent sx={{ px: 0 }}>
              <Typography variant="body1" paragraph>
                Lorem ipsum <strong style={{ color: '#3b82f6' }}>dolor sit amet</strong>, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
              </Typography>
              <Typography variant="body1" paragraph>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; <em>Integer nec odio</em>. Praesent libero. Sed cursus ante dapibus diam.
              </Typography>
              <Typography variant="body1" paragraph>
                Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. <span style={{ fontWeight: 'bold' }}>Pellentesque nibh</span>. Aenean quam.
              </Typography>
            </CardContent>
         
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default CeoSection;
