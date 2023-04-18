import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

import Title from "src/components/Title";
import Input from "src/components/Input";

import styles from "./AddPost.module.scss";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import classNames from "classnames";
import { addNewPost } from "src/redux/reducers/postSlice";
import { RoutesList } from "src/pages/Router";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [lessonNum, setLessonNum] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<ImageListType>([]);
    const [text, setText] = useState("");

    const onChange = (imageList: ImageListType) => {
        setImages(imageList);
    };

    const onSubmit = () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        formData.append("description", description);
        formData.append("lesson_num", lessonNum);
        formData.append("image", images[0].file as Blob);

        dispatch(
            addNewPost({
                callback: () => navigate(RoutesList.Home),
                data: formData,
            })
        );
    };

    return (
        <div className={styles.container}>
            <Title title={"AddPost"} />
            <Input
                title="Title"
                type={"text"}
                value={title}
                onChange={setTitle}
                placeholder="Add your title"
                inputClassName={styles.input}
            />
            <div className={styles.smallInputContainer}>
                <Input
                    title="Lesson Number"
                    type={"text"}
                    value={lessonNum}
                    onChange={setLessonNum}
                    placeholder="Add your lesson number"
                    inputClassName={styles.input}
                />
                <ImageUploading
                    multiple={false}
                    value={images}
                    onChange={onChange}
                    dataURLKey="data_url"
                >
                    {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <div className={styles.title}>Image</div>
                            {imageList.length === 0 ? (
                                <div
                                    className={classNames(styles.dragNDrop, {
                                        [styles.draggable]: isDragging,
                                    })}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </div>
                            ) : (
                                <Button
                                    title={"Remove all images"}
                                    type={ButtonType.Secondary}
                                    onClick={onImageRemoveAll}
                                />
                            )}
                            {imageList.map((image, index) => (
                                <div key={index} className={styles.imageItem}>
                                    <img src={image["data_url"]} alt="" width="100" />
                                    <div className={styles.updateButtonsContainer}>
                                        <Button
                                            title={"Update"}
                                            className={styles.updateButton}
                                            type={ButtonType.Secondary}
                                            onClick={() => onImageUpdate(index)}
                                        />
                                        <Button
                                            title={"Remove"}
                                            className={styles.updateButton}
                                            type={ButtonType.Secondary}
                                            onClick={() => onImageRemove(index)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
            <Input
                title="Description"
                type={"text"}
                value={description}
                onChange={setDescription}
                placeholder="Add your description"
                inputClassName={styles.input}
            />
            <Input
                title="Text"
                type={"text"}
                value={text}
                onChange={setText}
                placeholder="Add your text"
                inputClassName={styles.input}
            />
            <div className={styles.footer}>
                <Button
                    title="Delete post"
                    onClick={() => {}}
                    type={ButtonType.Error}
                />
                <div className={styles.actionButtonsContainer}>
                    <Button
                        title="Cancel"
                        onClick={() => {}}
                        type={ButtonType.Secondary}
                    />
                    <Button
                        title="Add post"
                        onClick={onSubmit}
                        type={ButtonType.Primary}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddPost;