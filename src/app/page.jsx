"use client";

import React, { useState, useEffect } from "react";

function SocialShare() {
    const postImage = "/post-image.jpg";
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(postImage);
                const blob = await response.blob();
                const file = new File([blob], "post-image.jpg", { type: blob.type });
                setImageFile(file);
            } catch (error) {
                console.error("Failed to fetch image:", error);
            }
        };

        fetchImage();
    }, [postImage]);

    const downloadAndShare = async () => {
        if (!imageFile) {
            alert("Image not loaded yet.");
            return;
        }

        const tempLink = document.createElement("a");
        tempLink.href = URL.createObjectURL(imageFile);
        tempLink.download = imageFile.name;
        tempLink.style.display = "none";
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);

        // Attempt to share the downloaded file.
        if (navigator.share) {
            try {
                await navigator.share({
                    files: [imageFile],
                    title: "Share Image",
                });
            } catch (error) {
                console.error("Error sharing:", error);
                alert("Sharing failed. Please share manually from your device's gallery.");
            }
        } else {
            alert("Sharing not supported. Please share manually from your device's gallery.");
        }
    };

    return (
        <div className="w-full h-lvh flex flex-col items-center justify-center text-center p-4">
            <img
                src={postImage}
                alt="Post image"
                className="w-80 h-60 object-cover my-4 rounded-md"
            />

            <button
                onClick={downloadAndShare}
                className="p-2 border border-blue-800 bg-blue-100 rounded-md my-2"
            >
                Download and Share
            </button>
        </div>
    );
}

export default SocialShare;