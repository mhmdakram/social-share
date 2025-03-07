"use client";

import React from "react";

function SocialShare() {
    const postTitle = "This is a post title";
    const postDescription = "This is a post description";
    const postImage = `${window.location.origin}/post-image.jpg`; // Absolute URL for sharing
    const postUrl = window.location.href; // The current page URL

    // Native Web Share API (for iOS & Android)
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: postTitle,
                    text: postDescription,
                    url: postImage, // Sharing the image via URL
                });
            } catch (error) {
                console.error("Error sharing:", error);
                alert("Sharing failed.");
            }
        } else {
            alert("Your device does not support the Web Share API.");
        }
    };

    // Instagram Share (Deep Linking)
    const shareOnInstagram = () => {
        const instagramDeepLink = `instagram://library?AssetPath=${encodeURIComponent(postImage)}`;
        window.location.href = instagramDeepLink;

        setTimeout(() => {
            alert("If Instagram didn't open, please upload the image manually.");
        }, 3000);
    };

    // LinkedIn Share (Redirect to LinkedIn post creation)
    const shareOnLinkedIn = () => {
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
        window.open(linkedInShareUrl, "_blank");
    };

    return (
        <div className="w-full h-lvh flex flex-col items-center justify-center text-center p-4">
            <img
                src={postImage}
                alt="Post image"
                className="w-80 h-60 object-cover my-4 rounded-md"
            />

            {/* Native Share Button */}
            <button
                onClick={handleShare}
                className="p-2 border border-blue-800 bg-blue-100 rounded-md my-2"
            >
                Share Post
            </button>

            {/* Instagram Share Button */}
            <button
                onClick={shareOnInstagram}
                className="p-2 border border-pink-500 bg-pink-200 rounded-md my-2"
            >
                Share on Instagram
            </button>

            {/* LinkedIn Share Button */}
            <button
                onClick={shareOnLinkedIn}
                className="p-2 border border-blue-700 bg-blue-300 rounded-md my-2"
            >
                Share on LinkedIn
            </button>
        </div>
    );
}

export default SocialShare;
