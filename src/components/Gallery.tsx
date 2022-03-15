import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../AuthContext";
import { app } from "../firebase-config";
import { E_Font, Font } from "./Font";

const GalleryWrapper = styled.div`
    width: 300px;
    margin: 30px auto 0 auto;
    background-color: white;
    padding: 10px;
    border-radius: 8px;
`;

const GalleryContent = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const GalleryPhotoWrapper = styled.div`
    position: relative;
    margin-bottom: 30px;
`;

const GalleryPhoto = styled.img`
    width: 147px;
`;

const GalleryPhotoDesc = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
`;

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
    const currentUser = useContext(AuthContext);

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
        let photosArray;
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
        <GalleryWrapper>
            <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>
                Galleri
            </Font>
            <Font weight={"light"} size={E_Font.FONT_SIZE_BASIC}>
                Klicka på bilden för att förstora
            </Font>
            <br></br>
            <GalleryContent>
                {gallery &&
                    gallery.map((item, index) => (
                        <GalleryPhotoWrapper style={{marginRight: `${index % 2 === 0 ? "5px" : "0"}`}} onClick={() => handleClick(item)}>
                            <GalleryPhoto src={`${item.fileUrl}`} />
                            <GalleryPhotoDesc>
                                {index % 2 === 0 ? "före" : "efter"}
                            </GalleryPhotoDesc>
                            {currentUser && (
                                <div
                                    onClick={() => deleteImage(item.id)}
                                    style={{
                                        zIndex: "2",
                                        color: "red",
                                        position: "absolute",
                                        top: "0",
                                        right: "0",
                                        fontSize: "2rem",
                                    }}
                                >
                                    <i className="far fa-times-circle"></i>
                                </div>
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