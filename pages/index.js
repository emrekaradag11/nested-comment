import Head from 'next/head'
import Image from 'next/image'
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './../Components/ListItem'
import Form from './../Components/Utils/Form'
import { addComment } from '../store/reducers'

export default function Home() {
  const commentList = useSelector((state) => state.comment.commentList)

  const Parent = (item) => (
    <ListItem parentId={item.parentId} title={item.title} desc={item.desc} vote={item.vote} date={item.date} propName={item.name} id={item.id} />
  );

  const Child = (item) => (
    <>
      {item?.children ? (
        <ul className='comments-list reply-list'>
          {item?.children.map((item2, key) => {
            return <li key={key}>
              <Parent {...item2} />
              <Child key={key} {...item2} />
            </li>
          })}
        </ul>
      ) : null}
    </>
  );


  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment({
      id: nanoid(),
      title: event.target.title.value,
      name: event.target.name.value,
      desc: event.target.desc.value,
    }))
  }

  return (
    <div>
      <Head>
        <title>Nested Comment System</title>
        <meta name="description" content="Nested Comment System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className='container'>
          <ul id="comments-list" className="comments-list">
            {commentList?.map((item, key) => (
              <li key={key}>
                <Parent {...item} />
                <Child key={key} {...item} />
              </li>
            ))}
          </ul>
        </div>

        <div className='container mb-5 pb-5'>
          <div className='col-lg-6 mx-auto'>
            <Form handleSubmit={handleSubmit} />
          </div>
        </div>
      </main>
    </div>
  )
}
