import React, { useState, useRef, useEffect } from "react";
import { Box, Slider, Typography, Button, Container } from "@mui/material";
import LOGO from "./ASSET/M A G I C (1).png";
import { GlobalStyles } from '@mui/material';
import LOGO2 from "./ASSET/REM3.png";

const MandalaDesigner = () => {
  const [segments, setSegments] = useState(8);
  const [brushRadius, setBrushRadius] = useState(2);
  const [color, setColor] = useState("#000000");
  const [isErasing, setIsErasing] = useState(false);
  const [eraserSize, setEraserSize] = useState(5);
  const canvasRef = useRef(null);

  useEffect(() => {
    drawSymmetry();
  }, [segments]);

  const drawSymmetry = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < segments; i++) {
      const angle = (2 * Math.PI * i) / segments;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.translate(-centerX, -centerY);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + canvas.width / 2, centerY);
      ctx.strokeStyle = "#F7BE69";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
  };

  const handleMouseDraw = (event) => {
    if (!event.buttons) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < segments; i++) {
      const angle = (2 * Math.PI * i) / segments;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.translate(-centerX, -centerY);

      ctx.beginPath();
      ctx.arc(x, y, isErasing ? eraserSize : brushRadius, 0, Math.PI * 2);
      ctx.fillStyle = isErasing ? "#001E12" : color;
      ctx.fill();
      ctx.restore();
    }
  };

  

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSymmetry();
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "mandala-design.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  const handleTouchStart = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
  
    const touch = event.touches[0];  // Get the first touch point
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
  
    for (let i = 0; i < segments; i++) {
      const angle = (2 * Math.PI * i) / segments;
  
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.translate(-centerX, -centerY);
  
      ctx.beginPath();
      ctx.arc(x, y, isErasing ? eraserSize : brushRadius, 0, Math.PI * 2);
      ctx.fillStyle = isErasing ? "#001E12" : color;
      ctx.fill();
      ctx.restore();
    }
  };
  
  const handleTouchMove = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
  
    const touch = event.touches[0];  // Get the first touch point
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
  
    for (let i = 0; i < segments; i++) {
      const angle = (2 * Math.PI * i) / segments;
  
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.translate(-centerX, -centerY);
  
      ctx.beginPath();
      ctx.arc(x, y, isErasing ? eraserSize : brushRadius, 0, Math.PI * 2);
      ctx.fillStyle = isErasing ? "#001E12" : color;
      ctx.fill();
      ctx.restore();
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Add touch event listeners to improve touch drawing smoothness
      canvas.addEventListener("touchstart", handleTouchStart);
      canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
      canvas.addEventListener("touchend", () => {
        // Handle touch end (optional: add cleanup)
      });
  
      // Cleanup on unmount
      
    }
  }, );
  
  

  return (
    <Container
      sx={{
        backgroundColor: "#001E12",
        minHeight: "100vh",
        width: "100%",
        padding: 0,
        margin: "0 auto",
        display: "block",
        '@media (max-width: 768px)': {
          padding: 2,
        },
      }}
    >
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            width: "100%",
          },
          html: {
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0,
          }
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ padding: 1 }}
      >
        <Box display="flex" justifyContent="center" mb={4}>
          <img
            src={LOGO}
            alt="Mandala Logo"
            width="290px"
            height="300px"
            style={{
              display: "block",
              marginTop: "-50px",
              marginBottom: "-68px",
              maxWidth: "100%",  // Make image responsive
            }}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          mb={2}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on small screens
            alignItems: { xs: 'center', sm: 'initial' },  // Center align buttons on small screens
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => setIsErasing(!isErasing)}
            sx={{
              backgroundColor: "#001E12",
              border: "2px solid #F7BE69",
              "&:hover": {
                backgroundColor: "#F9D38D",
                border: "2px solid #F7BE69",
                color: "#001E12",
                fontWeight: "bold",
              },
              minWidth: "200px",
              width: "100%",  // Make buttons responsive
            }}
          >
            {isErasing ? "Disable Eraser" : "Enable Eraser"}
          </Button>

          <Button
            variant="contained"
            onClick={clearCanvas}
            sx={{
              backgroundColor: "#001E12",
              border: "2px solid #F7BE69",
              "&:hover": {
                backgroundColor: "#F9D38D",
                border: "2px solid #F7BE69",
                color: "#001E12",
                fontWeight: "bolder",
              },
              minWidth: "200px",
              width: "100%",
            }}
          >
            Clear Canvas
          </Button>

          <Button
            color="contained"
            onClick={handleExport}
            sx={{
              backgroundColor: "#001E12",
              border: "2px solid #F7BE69",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#F9D38D",
                border: "2px solid #F7BE69",
                color: "#001E12",
                fontWeight: "bolder",
              },
              minWidth: "200px",
              width: "100%",
            }}
          >
            Export Design
          </Button>
        </Box>

        <canvas
  ref={canvasRef}
  width="500"
  height="500"
  style={{
    border: "1px solid #F7BE69",
    borderRadius: 8,
    backgroundColor: "#001E12",
    maxWidth: "100%", // Ensure canvas is responsive
  }}
  onMouseMove={handleMouseDraw}
  onTouchMove={handleTouchMove}
  onTouchStart={handleTouchStart}  // Ensure this event handler is also calling the correct function
/>


<Box
  mt={3}
  display="flex"
  justifyContent="space-between"
  width="100%"
  maxWidth={400}
  sx={{
    flexDirection: { xs: 'column', sm: 'row' }, // Stack sliders on small screens and row on larger screens
    gap: 2,
  }}
>
  {/* Symmetry Segments */}
  <Box sx={{ width: '100%' }}>
    <Typography gutterBottom sx={{ color: "#F7BE69" }}>Symmetry Segments</Typography>
    <Slider
      value={segments}
      onChange={(e, value) => setSegments(value)}
      min={4}
      max={16}
      step={1}
      valueLabelDisplay="auto"
      sx={{
        color: "#F7BE69", 
        "& .MuiSlider-thumb": {
          backgroundColor: "#F7BE69", 
        },
        "& .MuiSlider-rail": {
          backgroundColor: "#F7BE69", 
        }
      }}
    />
  </Box>

  {/* Brush Size */}
  <Box sx={{ width: '100%' }}>
    <Typography gutterBottom sx={{ color: "#F7BE69" }}>Brush Size</Typography>
    <Slider
      value={brushRadius}
      onChange={(e, value) => setBrushRadius(value)}
      min={2}
      max={20}
      step={1}
      valueLabelDisplay="auto"
      sx={{
        color: "#F7BE69", 
        "& .MuiSlider-thumb": {
          backgroundColor: "#F7BE69", 
        },
        "& .MuiSlider-rail": {
          backgroundColor: "#F7BE69", 
        }
      }}
    />
  </Box>
</Box>

{/* Second Row: Eraser Size and Brush Color */}
<Box
  mt={3}
  display="flex"
  justifyContent="space-between"
  width="100%"
  maxWidth={400}
  sx={{
    flexDirection: { xs: 'column', sm: 'row' }, // Stack sliders on small screens and row on larger screens
    gap: 2,
  }}
>
  {/* Eraser Size */}
  <Box sx={{ width: '100%' }}>
    <Typography gutterBottom sx={{ color: "#F7BE69" }}>Eraser Size</Typography>
    <Slider
      value={eraserSize}
      onChange={(e, value) => setEraserSize(value)}
      min={1}
      max={10}
      step={1}
      valueLabelDisplay="auto"
      sx={{
        color: "#F7BE69", // Set the slider color to #F7BE69
        "& .MuiSlider-thumb": {
          backgroundColor: "#F7BE69", // Set the thumb color to #F7BE69
        },
        "& .MuiSlider-rail": {
          backgroundColor: "#ccc", // Optional: You can set the rail color if you want to change it too
        }
      }}
    />
  </Box>

  {/* Brush Color */}
  <Box sx={{ width: '100%' }}>
    <Typography gutterBottom sx={{ color: "#F7BE69" }}>Brush Color</Typography>
    <input
      type="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
      style={{
        width: '100%',
        padding: 5,
        backgroundColor: "#F7BE69"
      }}
    />
  </Box>
</Box>

{/* Floating Image */}
<Box
  sx={{
    position: 'fixed',
    bottom: 1,  // Adjust the bottom distance from the screen
    right: 1,   // Adjust the right distance from the screen
    zIndex: 1000,  // Ensure it appears above other content
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', // Optional: adds shadow for a floating effect
  }}
>
  <img 
    src={LOGO2} // Replace with your image URL
    alt="IMAGE"
    style={{
      width: '100px',
      height: '140px',
      objectFit: 'cover',
      paddingTop: "10px",
      borderRadius: '50%',
      maxWidth: '100%', // Ensure the image is responsive
      height: 'auto' // Maintain aspect ratio of the image
    }}
  />
</Box>

      </Box>
    </Container>
  );
};

export default MandalaDesigner;
