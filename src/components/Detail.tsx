import React, { Component } from 'react'

export default class Detail extends Component<any> {
    constructor(props: any){
        super(props);
    }
    componentDidMount(){
        
    }
    render() {
        
        let dataDetail = this.props.location.search
        dataDetail = JSON.parse(dataDetail.substr(dataDetail.lastIndexOf('?')+1))
        
        return (
            <div>
               {dataDetail.name}
            </div>
        )
    }
}
