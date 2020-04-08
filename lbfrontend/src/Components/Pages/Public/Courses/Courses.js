import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IoIosInformationCircleOutline, IoIosSync, IoMdAddCircle, IoIosImage } from 'react-icons/io';
import {Link} from 'react-router-dom';

import Page from '../../Page';
import { paxios } from '../../../Utilities/Utilities.js';
import './List.css';
export default class Courses extends Component {
  constructor(){
    super();
    this.state={
     items:[],
     hasMore:true,
     page:1,
     itemsToLoad:10
    }
    this.loadMore = this.loadMore.bind(this);
 }
 loadMore(page){
    const items  = this.state.itemsToLoad;
    const uri = `/api/public/courses/${page}/${items}`;
    paxios.get(uri)
      .then(
        ({data})=>{
          console.log(data);
          const { courses:apiItems, total} = data;
          const loadedItems = this.state.items;
          apiItems.map((e)=>loadedItems.push(e));
          if(total){
              this.setState({
                'items': loadedItems,
                'hasMore': (page * items < total)
               });
           } else {
             this.setState({
               'hasMore': false
             });
           }
         }
       )
       .catch(
         (err)=>{
           console.log(err);
         }
       );
   }
   render() {
    const uiItems = this.state.items.map(
      (item)=>{
        console.log(item.courseName);
        return (
          <div className='listItem' key={item._id}>
            <span>{item.courseName} {item.courseHours}</span>
          </div>);
      }
    );
  
    if (!uiItems.length) uiItems.push(
      <div className="listItem" key="pbListAddOne">
        <span>No hay nada aquí</span>
      </div>);
  
    return (
      <Page pageTitle="Productos">
        <div className="list" ref={(ref)=> this.scrollParentRef = ref}>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMore}
              hasMore={this.state.hasMore}
              useWindow={false}
              threshold={108}
              getScrollParent={()=>this.scrollParentRef}
              loader={<div key="pbListLoading" className="listItem center"><IoIosSync/></div>}
              >
                {uiItems}
            </InfiniteScroll>
        </div>
      </Page>
     );
    }
  }
  