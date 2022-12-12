import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLike, addReplyComment } from '../store/reducers'
import Form from './Utils/Form'


function ListItem(props) {

    const timeSince = (time = props.date) => {
        switch (typeof time) {
            case 'number':
                break;
            case 'string':
                time = +new Date(time);
                break;
            case 'object':
                if (time.constructor === Date) time = time.getTime();
                break;
            default:
                time = +new Date();
        }
        var time_formats = [
            [60, 'seconds', 1], // 60
            [120, '1 minute ago', '1 minute from now'], // 60*2
            [3600, 'minutes', 60], // 60*60, 60
            [7200, '1 hour ago', '1 hour from now'], // 60*60*2
            [86400, 'hours', 3600], // 60*60*24, 60*60
            [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
            [604800, 'days', 86400], // 60*60*24*7, 60*60*24
            [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
            [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
            [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
            [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
            [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
            [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
            [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
            [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        var seconds = (+new Date() - time) / 1000,
            token = 'ago',
            list_choice = 1;

        if (seconds == 0) {
            return 'Just now'
        }
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'from now';
            list_choice = 2;
        }
        var i = 0,
            format;
        while (format = time_formats[i++])
            if (seconds < format[0]) {
                if (typeof format[2] == 'string')
                    return format[list_choice];
                else
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        return time
    }

    const dispatch = useDispatch()
    const setLikes = (id = props.id) => dispatch(setLike(id))
    const [activeForm, setActiveForm] = useState('d-none')

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addReplyComment({
            title: event.target.title.value,
            name: event.target.name.value,
            desc: event.target.desc.value,
            parentId: event.target.parentId.value,
        }))
    }
    return (
        <div className="comment-main-level">
            <div className="comment-avatar"><img src="https://media-exp1.licdn.com/dms/image/C4D03AQHknommpzgwJw/profile-displayphoto-shrink_800_800/0/1649449069095?e=1676505600&v=beta&t=lbbW50GdxiPjU9MAINgDOrK9lNUwhZlyRGl07gmur4s" alt="Emre KARADAĞ" /></div>
            <div className="comment-box">
                <div className="comment-head">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                            <h6 className="comment-name by-author"><a href="https://github.com/emrekaradag11/" target="_blank" rel="nofollow noreferrer">{props.propName}</a></h6>
                            <span>{timeSince()}</span>
                        </div>
                        <div className="col-auto">
                            <div className="badge bg-info align-middle">{props.vote}</div>
                            <button onClick={() => setLikes()} className='bi bi-heart btn'></button>
                            <button onClick={() => setActiveForm(activeForm === 'd-none' ? '' : 'd-none')} className='bi bi-reply btn'></button>
                        </div>
                    </div>
                </div>
                <div className="comment-content">
                    <strong className='title d-block mb-2 fs-5'>{props.title}</strong>
                    {props.desc}
                </div>
                <div className={activeForm + " formContent"}>
                    <Form handleSubmit={handleSubmit} parentId={props.id} />
                </div>
            </div>
        </div>
    )
}

export default ListItem