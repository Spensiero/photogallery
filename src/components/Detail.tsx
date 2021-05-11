import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './Detail.scss'

export default class Detail extends Component<any> {
    constructor(props: any){
        super(props);
    }
    render() {
        let dataDetail = this.props.location.search
        try{
            dataDetail = JSON.parse(dataDetail.substr(1, dataDetail.length + 1))
        }
        catch(error){
            console.log(error)
        }
        return (
            <div>
                {dataDetail.url && <img className='imageFullScreen' src={dataDetail.url} alt=""/>}
                <Link to="/"><svg style={{width: '30px', height: '30px', position: 'fixed', top: '20px', right: '20px', fill: "#fff", cursor: "pointer", backgroundColor: "rgba(0,0,0,0.5)"}} focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></Link>
                <div className='imageInfo'>
                    {dataDetail.title && <div style={{width: "calc(100% - 40px)", whiteSpace: "nowrap",overflow: "hidden", textOverflow: "ellipsis"}}><span className='imageInfoText'>Title: </span>{dataDetail.title}</div>}
                    {dataDetail.author && <div><span className='imageInfoText'>Author: </span>{dataDetail.author}</div>}
                </div>
            </div>    
        )
    }
}
