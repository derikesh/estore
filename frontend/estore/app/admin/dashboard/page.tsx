'use client'

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '@/src/store/rtkQuery';
import type { AppDispatch } from '@/src/store/store';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(api.util.prefetch('readallProduct', undefined, { force: true }));
    dispatch(api.util.prefetch('readCategories', undefined, { force: true }));
  }, [dispatch]);

  return (
    <>
      this is home dashboard with some graphs
    </>
  );
}