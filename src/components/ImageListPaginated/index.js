import { useState } from 'react';
import Button from '../Button';
import ImageList from '../ImageList';
import styles from './styles.module.scss';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

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
          <span>
            <strong>{srcs.length}</strong> all photos
          </span>
          <span>
            page <strong>{currentPage + 1}</strong> of <strong>{pages}</strong>
          </span>
        </div>
        <div className={styles.ImageListPaginatedHeaderBtns}>
          <Button
            variation="transparent"
            disabled={currentPage <= 0}
            aria-label="previous page"
            onClick={onPrev}
          >
            <BsChevronLeft size={28} strokeWidth={2} />
          </Button>
          <Button
            variation="transparent"
            disabled={currentPage + 1 >= pages}
            aria-label="next page"
            onClick={onNext}
          >
            <BsChevronRight size={28} strokeWidth={2} />
          </Button>
        </div>
      </div>
      <ImageList srcs={currentSrcs} {...otherProps} />
    </div>
  );
};

export default ImageListPaginated;
