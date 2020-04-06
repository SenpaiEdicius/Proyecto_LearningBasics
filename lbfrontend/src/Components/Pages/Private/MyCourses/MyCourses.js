import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IoIosInformationCircleOutline, IoIosSync, IoMdAddCircle, IoIosImage, IoMdPlay } from 'react-icons/io';
import {getLocalStorage} from '../../../Utilities/Utilities';
import {Link} from 'react-router-dom';

import Page from '../../Page';
import { saxios } from '../../../Utilities/Utilities';
export default class MyCourses extends Component {
    constructor(){
        super();
        this.state={
            items:[],
            hasMore:true,
            page:1,
            itemsToLoad:5,
            user: (getLocalStorage('user')||{})
        }
        this.loadMore = this.loadMore.bind(this);
    }

    loadMore(page){
        const items = this.state.itemsToLoad;
        const uri = `api/user/mycourses/${this.props.auth.id}`;
        saxios.get(uri)
        .then(
            ({data})=>{
                console.log(data);
                const {userCourses: courses, total} = data;
                const loadedItems = this.state.items;
                courses.map((e)=>loadedItems.push(e));
                if(total){
                    this.setState({
                        'items':loadedItems,
                        'hasMore':(page * items < total)
                    });
                }else{
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
        )
    };

    render(){
        const uiItems = this.state.items.map(
            (item)=>{
                return(
                    <div className='item' key={item[0]._id}>
                        <span>{item[0].courseName}</span>
                        <span>Average Hours: {item[0].courseHours}</span>
                        <span className='updateListItem'>
                            <Link to={`/mycourses/classes/${item[0]._id}`}>
                            <IoMdPlay size='1em'/>
                            </Link></span>
                    </div>
                );
            }
        );

        if(!uiItems.length) uiItems.push(
            <div className='list-items' key='pbListAddOne'>
                <span>No hay nada aquí</span>
            </div>
        );

        return(
            <Page pageTitle="MyCourses" auth={this.props.auth}>
                    <div ref={(ref)=> this.scrollParentRef = ref} className="page-list">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMore}
                            hasMore={this.state.hasMore}
                            useWindow={false}
                            getScrollParent={()=>this.scrollParentRef}
                            loader={<div key="pbListLoading"><IoIosSync/></div>}
                            >
                            {uiItems}
                        </InfiniteScroll>
                    </div>
            </Page>
        );
    }
}