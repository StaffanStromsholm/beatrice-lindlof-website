import React, { useEffect, useState } from 'react'
import { app } from "../firebase-config";
import { E_Font, Font } from './Font';

const db = app.database();

type T_Gallery = {
    fileUrl: string
}


export default function Gallery() {
    const [gallery, setGallery] = useState<T_Gallery[] | null>(null);

    useEffect(() => {
                let photosArray;
                const ref = db.ref("galleryImages");
        
                ref.on("value", (snapshot) => {
                    const galleryPhotos = snapshot.val();
        
                    const photosList = [];
        
                    for (let id in galleryPhotos) {
                        photosList.push({ ...galleryPhotos[id] });
                    }
        
                    setGallery(photosList);
                });
            }, []);

    return (
        <div>
            
            <Font weight={"light"} size={E_Font.FONT_SIZE_TITLE}>Galleri</Font>

            {gallery && gallery.reverse().map(item => 
                <img style={{width: "100px"}} src={`${item.fileUrl}`} />
            )}
        </div>
    )
}


// import React, { useContext, useEffect, useState, useReducer } from "react";
// // import { filterPosts, filterPastPosts } from "../utils";

// import app from "../base";
// import Header from "../Components/Header";
// import styled from "styled-components";
// import { AuthContext } from "../Auth.js";


// const db = app.database();

// const GalleryWrapper = styled.div`
//     display: flex;
//     max-width: 900px;
//     flex-wrap: wrap;
//     margin: 0 auto 40px auto;
// `;

// const ImageWrapper = styled.div`
//     width: 31.33%;
//     height: 300px;
//     object-fit: cover;
//     margin: 1%;
//     border-radius: 5px;
//     overflow: hidden;
//     position: relative;
//     :hover {
//         opacity: 0.7;
//         transition: 0.6s;
//         cursor: pointer;
//     }
//     @media (max-width: 700px) {
//         height: 200px;

//     }
//     @media (max-width: 600px) {
//         height: 150px;
//     }
//     @media (max-width: 500px) {
//         height: 120px;
//     }
// `;

// const Title = styled.h3`
//     width: 100%;
//     margin: 50px 0;
//     text-align: center;
//     font-size: 30px;
//     font-weight: bold;
// `;

// const CloseWrapper = styled.div`
//     position: absolute;
//     top: 30px;
//     right: 30px;
//     border: 2px solid white;
//     border-radius: 5px;
//     width: 40px;
//     height: 40px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

// const DeleteBtn = styled.button`
//     border: none;
//     background: red;
//     color: white;
//     // margin-top: -40px;
//     position: absolute;
// `;

// function PhotoModal(props) {
//     const Modal = styled.div`
//         position: fixed;
//         width: 100%;
//         height: 100vh;
//         top: 0;
//         left: 0;
//         background-color: rgba(0, 0, 0, 0.8);
//         color: white;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         z-index: 2;
//         cursor: pointer;
//         @media (max-width: 900px) {
//             height: calc(100vh - 109px);
//             top: 109px;
//         }
//     `;

//     const ModalImage = styled.img`
//         max-width: 90%;
//         max-height: 90%;
//     `;

//     const handleSetIsModalOpen = () => {
//         props.setIsModalOpen(false);
//     };

//     return (
//         <div>
//             {props.visible && (
//                 <Modal onClick={handleSetIsModalOpen}>
//                     <ModalImage src={props.photo.fileUrl} />
//                     <CloseWrapper>
//                         <i className="fas fa-times"></i>
//                     </CloseWrapper>
//                 </Modal>
//             )}
//         </div>
//     );
// }

// export default function Gallery() {
//     const [photos, setPhotos] = useState();
//     const [chosenPhoto, setChosenPhoto] = useState();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const { currentUser } = useContext(AuthContext);

//     const handleClick = (photo) => {
//         setChosenPhoto(photo);
//         setIsModalOpen(true);
//     };

//     const deleteImage = (id) => {
//         const areYouSure = window.confirm("Radera den här bilden?")

//         if(!areYouSure) return;

//         const ref = db.ref("galleryPhotos").child(id)
//         ref.remove();

//         window.location.reload();
//     }

//     useEffect(() => {
//         let photosArray;
//         const ref = db.ref("galleryPhotos");

//         ref.on("value", (snapshot) => {
//             const galleryPhotos = snapshot.val();

//             const photosList = [];

//             for (let id in galleryPhotos) {
//                 photosList.push({ id, ...galleryPhotos[id] });
//             }

//             setPhotos(photosList);
//         });
//     }, []);

//     return (
//         <>
//         {photos && photos.length > 0 && <><Title id="gallery">Gallery</Title>
//             <GalleryWrapper>
//                 {
//                     photos.map((photo) => (
//                             <ImageWrapper
//                                 onClick={() => handleClick(photo)}
                                
//                             >
//                                 <img src={photo.fileUrl}
//                                 style={{objectFit: "cover", width: "100%", height: "100%"}}
//                                 alt={"gallery image"}/>
//                                 {currentUser && 
//                                 <div onClick={() => deleteImage(photo.id)} style={{zIndex: "2", color:"red", position: "absolute", top: "0", right: "0", fontSize:"3rem"}}><i class="far fa-times-circle"></i></div>}
                                
//                             </ImageWrapper>
//                     ))}
//                 <PhotoModal
//                     setIsModalOpen={setIsModalOpen}
//                     visible={isModalOpen}
//                     photo={chosenPhoto}
//                 />
//             </GalleryWrapper></>}
//         </>
//     );
// }