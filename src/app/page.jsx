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
    }, []);

    const handleShare = async () => {
        if (!imageFile) {
            alert("Image not loaded yet.");
            return;
        }

        if (navigator.share && navigator.canShare({ files: [imageFile] })) {
            try {
                await navigator.share({
                    title: "This is a post title",
                    text: "This is a post description",
                    files: [imageFile], // Directly sharing the image
                });
            } catch (error) {
                console.error("Error sharing:", error);
                alert("Sharing failed.");
            }
        } else {
            alert("Your device does not support image sharing.");
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
                onClick={handleShare}
                className="p-2 border border-blue-800 bg-blue-100 rounded-md my-2"
            >
                Share Post
            </button>
        </div>
    );
}

export default SocialShare;
