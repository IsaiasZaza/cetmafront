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
              bgcolor: 'primary.main', 
              color: 'white', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: { xs: 'center', md: 'start' }, 
              py: 5, 
              px: { xs: 2, md: 5 } 
            }}
          >
            <CardMedia
              component="img"
              src="/teste-cursos.jpg"
              alt="Foto do CEO"
              sx={{ width: 150, height: 150, borderRadius: '50%', mb: 3, objectFit: 'cover' }}
            />
            <Typography variant="h6" gutterBottom>Qualificações</Typography>
            <List>
              {["Primeira", "Segunda", "Terceira", "Quarta"].map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <CheckCircleIcon sx={{ color: 'white' }} />
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
          <Grid item xs={12} md={8} sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Biografia do CEO
            </Typography>
            <CardContent sx={{ px: 0 }}>
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
              </Typography>
              <Typography variant="body1" paragraph>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
              </Typography>
              <Typography variant="body1" paragraph>
                Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam.
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default CeoSection;
