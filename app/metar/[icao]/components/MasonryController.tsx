'use client';

import { useEffect } from 'react';

interface IMasonryControllerProps {
  containerClass: string;
}

export default function MasonryController(props: IMasonryControllerProps) {
  async function loadMasonry() {
    const { default: Masonry } = await import('masonry-layout');

    const msnry = new Masonry(props.containerClass, {
      percentPosition: true,
    });
  }

  useEffect(() => {
    loadMasonry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.containerClass]);

  return <></>;
}
