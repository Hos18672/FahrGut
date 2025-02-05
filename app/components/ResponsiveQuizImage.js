import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import placeholderImage from "../assets/icon/image.png"; // Ensure this path is correct

const ResponsiveQuizImage = ({ imageURL, maxWidth = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  // Get screen dimensions
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // Calculate the image width and height dynamically
  const imageWidth = Math.min(screenWidth * 0.86, maxWidth || 450); // Use 86% of screen width or maxWidth, whichever is smaller
  const imageHeight = (imageWidth * 2) / 3; // Maintain 3:2 aspect ratio

  // Preload the image
  useEffect(() => {
    if (imageURL) {
      Image.prefetch(imageURL)
        .then(() => setImageLoadFailed(false))
        .catch(() => setImageLoadFailed(true));
    }
  }, [imageURL]);

  return (
    <View style={styles.imageContainerMain}>
      {/* Show loading indicator while the image is loading */}
      {imageURL && !imageLoaded && !imageLoadFailed && (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#0000ff"
        />
      )}

      {/* Show the remote image once it's loaded */}
      {imageURL && !imageLoadFailed && (
        <View style={[styles.imageContainer, { width: imageWidth, height: imageHeight }]}>
          <Image
            source={{ uri: imageURL }}
            style={styles.questionImage}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoadFailed(true)}
          />
        </View>
      )}

      {/* Show placeholder if image fails to load or no image URL is provided */}
      {(imageLoadFailed || !imageURL) && (
        <View style={[styles.imageContainer, { width: imageWidth, height: imageHeight }]}>
          <Image
            source={placeholderImage}
            style={styles.placeholderImage}
            contentFit="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainerMain: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Optional: Add a background color for the container
  },
  questionImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "50%", // Adjust size of placeholder image
    height: "50%", // Adjust size of placeholder image
    opacity: 0.5, // Optional: Add opacity for a subtle effect
  },
  loadingIndicator: {
    position: "absolute", // Position the loading indicator absolutely
  },
});

export default ResponsiveQuizImage;