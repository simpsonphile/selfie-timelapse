import { useState } from 'react';
import Button from '../Button';
import ImageList from '../ImageList';
import styles from './styles.module.scss';

const ImageListPaginated = ({ srcs, perPage = 15, ...otherProps }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(srcs.length / perPage);
  const currentSrcs = [...srcs].splice(currentPage * perPage, perPage);

  const onNext = () => setCurrentPage((prev) => prev + 1);
  const onPrev = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className={styles.ImageListPaginated}>
      <div className={styles.ImageListPaginatedHeader}>
        <div className={styles.ImageListPaginatedHeaderPages}>
          <span>{srcs.length} all photos</span>
          <span>
            page {currentPage + 1} of {pages}
          </span>
        </div>
        <div className={styles.ImageListPaginatedHeaderBtns}>
          <Button disabled={currentPage <= 0} onClick={onPrev}>
            Prev
          </Button>
          <Button disabled={currentPage >= pages} onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
      <ImageList srcs={currentSrcs} {...otherProps} />
    </div>
  );
};

export default ImageListPaginated;
