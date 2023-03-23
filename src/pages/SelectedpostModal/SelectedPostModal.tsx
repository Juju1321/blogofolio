import React from "react";
import {useDispatch, useSelector} from "react-redux";

import Modal from "src/components/Modal";
import Card from "src/components/Card";
import {PostSelectors, setPostVisibility, setSelectedPost} from "src/redux/reducers/postSlice";
import {CardSize} from "src/utils/@globalTypes";

const SelectedPostModal = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector(PostSelectors.getVisibleSelectedModal);
    const selectedPost = useSelector(PostSelectors.getSelectedPost);

    const onClose = () => {
        dispatch(setSelectedPost(null));
        dispatch(setPostVisibility(false));
    };

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            {selectedPost ? (
                <Card card={selectedPost} size={CardSize.Large}/>
            ) : null
            }
        </Modal>
    )
}

export default SelectedPostModal