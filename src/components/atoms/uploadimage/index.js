import React, { useState } from 'react';
import styles from './upload.module.css';
import Image from 'next/image';
import { myaccountTranslation } from '@/locales';
const lang = process.env.NEXT_PUBLIC_LANG || 'se';
const ImageUploader = () => {
    const mat = myaccountTranslation[lang];
    const [imageSrc, setImageSrc] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            {!imageSrc && (
                <div className={styles.uploadContainer}>
                    <label htmlFor="image-upload" className={styles.uploadLabel}>
                        <div className={styles.uploadIcon}>
                        <i class="fa-regular fa-image"></i>
                        </div>
                        {mat.chooseImage}
                    </label>
                    <input type="file" id='image-upload' className={styles.uploadInput} accept="image/*" onChange={handleImageUpload} />
                </div>
            )}
            {imageSrc && (
                <div id="image-preview" className={styles.imagePreview}>
                    <Image src={imageSrc} width={132} height = {92} alt="Uploaded preview" />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
