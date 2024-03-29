import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { app } from "../firebase-config";
import { E_Font, Font } from "./Font";

const GalleryWrapper = styled.div`
    width: 600px;
    margin: 30px auto 0 auto;
    // background-color: white;
    background-color: rgb(240, 240, 240);
    padding: 20px;
    // border-radius: 8px;
    box-shadow: 0px 2px 8px #2b2b2b;
    @media (max-width: 768px) {
        width: 280px;
    }
`;

const GalleryContent = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const GalleryPhotoWrapper = styled.div`
    position: relative;
    margin-top: 30px;
`;

const GalleryPhoto = styled.img`
    width: 297px;
    box-shadow: 2px 1px 5px gray;
    @media (max-width: 768px) {
        width: 137px;
    }
`;

const GalleryPhotoDesc = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 3px;
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
`;

const DeleteButton = styled.div`
    z-index: 1;
    color: red;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2rem;
`

const db = app.database();

type T_Gallery = {
    fileUrl: string;
    id: string;
};

function PhotoModal(props: any) {
    const Modal = styled.div`
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        cursor: pointer;
        @media (max-width: 900px) {
            height: calc(100vh);
        }
    `;

    const ModalImage = styled.img`
        max-width: 90%;
        max-height: 90%;
    `;

    const CloseWrapper = styled.div`
        position: absolute;
        top: 30px;
        right: 30px;
        border: 2px solid white;
        border-radius: 5px;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const handleSetIsModalOpen = () => {
        props.setIsModalOpen(false);
    };

    return (
        <div>
            {props.visible && (
                <Modal onClick={handleSetIsModalOpen}>
                    <ModalImage src={props.photo.fileUrl} />
                    <CloseWrapper>
                        <i className="fas fa-times"></i>
                    </CloseWrapper>
                </Modal>
            )}
        </div>
    );
}

export default function Gallery() {
    const [gallery, setGallery] = useState<T_Gallery[] | null>(null);
    const [chosenPhoto, setChosenPhoto] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const context = useContext(Context);

    const handleClick = (photo: any) => {
        setChosenPhoto(photo);
        setIsModalOpen(true);
    };

    const deleteImage = (id: string) => {
        const areYouSure = window.confirm("Radera den här bilden?");

        if (!areYouSure) return;

        const ref = db.ref("galleryImages").child(id);
        ref.remove();

        window.location.reload();
    };

    useEffect(() => {
        const ref = db.ref("galleryImages");

        ref.on("value", (snapshot) => {
            const galleryPhotos = snapshot.val();
            const photosList = [];

            for (let id in galleryPhotos) {
                photosList.push({ id, ...galleryPhotos[id] });
            }

            setGallery(photosList);
        });
    }, []);

    return (
        <GalleryWrapper id="gallery">
            <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>
                {context?.language === "sv" && "Galleri"}
                {context?.language === "fi" && "Galleria"}
            </Font>
            <GalleryContent>
                {gallery &&
                    gallery.map((item, index) => (
                        <GalleryPhotoWrapper
                            style={{
                                marginRight: `${index % 2 === 0 ? "5px" : "0"}`,
                            }}
                            onClick={() => handleClick(item)}
                        >
                            <GalleryPhoto src={`${item.fileUrl}`} />
                            <GalleryPhotoDesc>
                                {index % 2 === 0 &&
                                    context?.language === "sv" &&
                                    "Före"}
                                {index % 2 === 0 &&
                                    context?.language === "fi" &&
                                    "Ennen"}
                                {index % 2 !== 0 &&
                                    context?.language === "sv" &&
                                    "Efter"}
                                {index % 2 !== 0 &&
                                    context?.language === "fi" &&
                                    "Jälkeen"}
                            </GalleryPhotoDesc>
                            {context?.currentUser && (
                                <DeleteButton onClick={() => deleteImage(item.id)}>
                                    <i className="far fa-times-circle"></i>
                                </DeleteButton>
                            )}
                        </GalleryPhotoWrapper>
                    ))}
                <PhotoModal
                    setIsModalOpen={setIsModalOpen}
                    visible={isModalOpen}
                    photo={chosenPhoto}
                />
            </GalleryContent>
        </GalleryWrapper>
    );
}
