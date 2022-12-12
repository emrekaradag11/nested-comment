import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    commentList: [
        {
            "id": 'IKIGhUYWpebuhCFjlgtmO',
            "title": "Quisque Velit Nisi, Pretium Ut Lacinia In",
            "name": "Emre KARADAĞ",
            "desc": "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt.",
            "date": "Sun Dec 11 2022 10:00:00 GMT+0300 (GMT+03:00)",
            "vote": 42,
            "parentId": '0',
            "children": [
                {
                    "id": 'WsU7KGfDGlwfjPtEjq_W_',
                    "title": "Quisque Velit Nisi, Pretium Ut Lacinia In",
                    "name": "Emre KARADAĞ",
                    "desc": "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
                    "date": "Sun Dec 11 2022 10:00:00 GMT+0300 (GMT+03:00)",
                    "vote": 3,
                    "parentId": 'IKIGhUYWpebuhCFjlgtmO',
                    "children" : [],
                },
                {
                    "id": 'zJNLmLOYjQxuh48smR1Gu',
                    "title": "Mauris Blandit Aliquet Elit, Eget ",
                    "name": "Emre KARADAĞ",
                    "desc": "Cras ultricies ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
                    "date": "Sun Dec 11 2022 10:00:00 GMT+0300 (GMT+03:00)",
                    "vote": 0,
                    "parentId": 'IKIGhUYWpebuhCFjlgtmO',
                    "children": [
                        {
                            "id": 'wcUGvSv3oqMQOcV66F4cG',
                            "title": "Praesent Sapien Massa, Convallis a Pellentesque",
                            "name": "Emre KARADAĞ",
                            "desc": "Donec sollicitudin molestie malesuada. Sed porttitor lectus nibh. Curabitur aliquet quam id dui posuere blandit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
                            "date": "Sun Dec 11 2022 10:00:00 GMT+0300 (GMT+03:00)",
                            "vote": 22,
                            "parentId": 'zJNLmLOYjQxuh48smR1Gu',
                            "children" : [],
                        },
                    ]
                },
            ]
        },
        {
            "id": 'eYjrKHdJvkkKJCzmjOpGR',
            "title": "Nisl Tempus Convallis Quis Ac Lectus",
            "name": "Emre KARADAĞ",
            "desc": "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus.",
            "date": "Sun Dec 11 2022 10:00:00 GMT+0300 (GMT+03:00)",
            "vote": 925,
            "parentId": '0',
            "children" : [],
        }
    ]
}

const nestedRecursive = (commentlist = initialState.commentList, ids, type, pushData = {}) => {
    for (let index = 0; index < commentlist.length; index++) {

        if (type === "vote")
            if (commentlist[index].id == ids) commentlist[index].vote += 1;

        if (type === "pushComment") {
            
            if (commentlist[index].id == ids) {
                commentlist[index].children.push({
                    "id": nanoid(),
                    "title": pushData.title,
                    "name": pushData.name,
                    "desc": pushData.desc,
                    "date": Date(),
                    "vote": 0,
                    "parentId": pushData.parentId,
                    "children" : []
                })
            }
        }

        if (commentlist[index].children)
            nestedRecursive(commentlist[index].children, ids, type, pushData)
    }
    return commentlist
};


const states = createSlice({
    name: 'states',
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.commentList.push({
                "id": nanoid(),
                "title": action.payload.title,
                "name": action.payload.name,
                "desc": action.payload.desc,
                "date": Date(),
                "vote": 0,
                "parentId": '0',
                "children" : []
            })
        },
        addReplyComment: (state, action) => {
            state.commentList = nestedRecursive(state.commentList, action.payload.parentId, "pushComment", action.payload)
        },
        setLike: (state, action) => {
            state.commentList = nestedRecursive(state.commentList, action.payload, "vote")
        },
    }
})

export const { addComment, addReplyComment, setLike } = states.actions

export default states.reducer