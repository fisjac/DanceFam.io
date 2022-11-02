import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

export default function CommunityPage() {
  const allCommunities = useSelector(state=>state.communities.allCommunities)
  const params = useParams();
  console.log(params)
  return (
    <div>{params.community}</div>
  )
}
