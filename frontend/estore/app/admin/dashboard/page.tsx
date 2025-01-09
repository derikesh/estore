'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import { api } from '@/src/store/rtkQuery'

export default function Dashboard() {

  const dispatch = useDispatch<any>()

  dispatch( api.util.prefetch('readallProduct',undefined , {force:true}) , ()=>{
    console.log("just called a read all product")
  } );
  dispatch( api.util.prefetch('readCategories',undefined , {force:true}) );


  return (
    <>
    this is home dashboard with some graphs
    </>
  )
}
