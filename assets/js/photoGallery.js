const main = () => {
  const GALLERY_SELECTOR = '#gallery > .photo';
  const DETAIL_SELECTOR = '#photo-detail';
  const TAG_LIST_SELECTOR = '#tag-list .tag';

  const showElement = (id) => {
    const photo = document.querySelector(`#gallery > [data-uid="${id}"]`);
    if (!photo) {
      return;
    }
    const path = photo.getAttribute('data-full-size');
    const title = photo.getAttribute('data-title');
    const tags = photo.getAttribute('data-tags').split(',');

    const detailElement = document.querySelector(DETAIL_SELECTOR);
    const imgElement = detailElement.querySelector('.detail-wrapper > figure > img#detail-img');
    const captionElement = detailElement.querySelector('.detail-wrapper > figure #detail-caption');

    if (imgElement && captionElement) {
      imgElement.setAttribute('src', path);
      imgElement.setAttribute('data-uid', id);
      const tagList = tags.map((tag) => {
        return `<a href="?tags=${tag}">#${tag}</a>`
      }).join('');
      captionElement.innerHTML = `${title} - ${tagList}`
      detailElement.style.display = 'block';
    }

    updateArrows(id);
  }

  const updateArrows = (id) => {
    const nextArrow = detailElement.querySelector('#next');
    const previousArrow = detailElement.querySelector('#prev');
    nextArrow.style.display = 'block';
    previousArrow.style.display = 'block';

    if (!hasNext(id)) nextArrow.style.display = 'none';
    if (!hasPrevious(id)) previousArrow.style.display = 'none'
  }

  const hideElement = () => {
    const detailElement = document.querySelector(DETAIL_SELECTOR);
    const imgElement = detailElement.querySelector('.detail-wrapper > figure > img#detail-img');
    imgElement.removeAttribute('src');
    imgElement.removeAttribute('data-uid');
    document.querySelector(DETAIL_SELECTOR).style.display = 'none';
  };

  const hideFilteredPhotos = () => {
    const tags = getTagsFromURL();
    if (!tags.length) {
      // No tag selected, show all photos
      document.querySelectorAll(GALLERY_SELECTOR).forEach((thumbnail) => {
        thumbnail.style.display = 'block';
      });
      return;
    }
    tags.forEach((tag) => {
      document.querySelectorAll(GALLERY_SELECTOR).forEach((thumbnail) => {
        const tags = thumbnail.getAttribute('data-tags').split(',');
        if (!tags.includes(tag)) {
          thumbnail.style.display = 'none';
        }
      });

      const tagElement = document.querySelector(`#tag-list .tag[data-uid="${tag}"]`);
      if (tagElement) {
        tagElement.classList.add('active');
      }
    });
  }

  const getFilteredPhotos = () => {
    const selectedTags = getTagsFromURL();
    const photos = [...document.querySelectorAll(GALLERY_SELECTOR)];
    return photos.filter((photo) => {
      const photoTags = photo.getAttribute('data-tags').split(',');
      return selectedTags.every((tag) => {
        return photoTags.includes(tag);
      });
    });
  }

  const getFilteredPhotoIDs = () => 
    getFilteredPhotos().map((photo) => parseInt(photo.getAttribute('data-uid'), 10));

  const photoIterator = (id, forward = true) => {
    const filteredPhotoIDs = getFilteredPhotoIDs();
    const index = filteredPhotoIDs.findIndex((photoID) => photoID === parseInt(id, 10));
    // not found
    if (index < 0) {
      return -1;
    }
    if (forward) {
      // last photo
      if (index >= filteredPhotoIDs.length -1) {
        return -1;
      } 
    } else {
      // first photo
      if (index === 0) {
        return -1;
      } 
    }
    
    return filteredPhotoIDs[forward ? index + 1 : index - 1];
  }

  const getNextID = (id) => photoIterator(id);
  const hasNext = (id) => getNextID(id) > 0;

  const getPreviousID = (id) => photoIterator(id, false);
  const hasPrevious = (id) => getPreviousID(id) > 0;

  const handleArrow = (next = true) => {
    const detailElement = document.querySelector(DETAIL_SELECTOR);
    const imgElement = detailElement.querySelector('.detail-wrapper > figure > img#detail-img');
    const id = parseInt(imgElement.getAttribute('data-uid'), 10);
    if (id) {
      // detail view is open
      const nextId = next ? getNextID(id) : getPreviousID(id);
      if (nextId < 0) return; // invalid new id. at first of last image.
      showElement(nextId);
    }
  }
  
  const getTagsFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tagsString = urlParams.get('tags');
    if (tagsString) {
      return tagsString.split(',');
    }

    return [];
  }

  const setTagsToUrl = (tags) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('tags', tags.join(','))
    window.location.search = urlParams;
  }

  const onThumbnailClick = (element) => {
    element = element || window.event;
    element.preventDefault ? element.preventDefault() : (element.returnValue = false);
    const thumbnail = element.currentTarget || element.srcElement;
    const id = thumbnail.getAttribute('data-uid');
    showElement(id);
  }

  const onTagClick = (element) => {
    element = element || window.event;
    element.preventDefault ? element.preventDefault() : (element.returnValue = false);
    const tagElement = element.currentTarget || element.srcElement;
    const clickedTag = tagElement.getAttribute('data-uid');
    const oldTags = getTagsFromURL();
    const newTags = oldTags.includes(clickedTag) ?
      oldTags.filter((t) => t !== clickedTag) :
      [...oldTags, clickedTag];
    setTagsToUrl(newTags);
  }

  const handleKeyEvent = (event) => {
    const key = event.keyCode ? event.keyCode : event.which;
    switch (key) {
      case 27: // ESC
        hideElement();
        break;

      case 37: // Arrow left
        handleArrow(false);
        break;

      case 39: // Arrow right
        handleArrow(true);
        break;

      default:
        break;
    }
  }

  document.addEventListener('keyup', handleKeyEvent);
  document.addEventListener('swiped-right', () => handleArrow(false));
  document.addEventListener('swiped-left', () => handleArrow(true));

  const detailElement = document.querySelector(DETAIL_SELECTOR)
  detailElement.querySelector('#prev').addEventListener('click', () => handleArrow(false));
  detailElement.querySelector('#next').addEventListener('click', () => handleArrow(true));
  detailElement.querySelector('#close').addEventListener('click', hideElement);

  document.querySelectorAll(GALLERY_SELECTOR).forEach((thumbnail) => {
    thumbnail.addEventListener('click', onThumbnailClick);
  });

  document.querySelectorAll(TAG_LIST_SELECTOR).forEach((tag) => {
    tag.addEventListener('click', onTagClick);
  })
  
  hideFilteredPhotos();
};

document.addEventListener(
  "DOMContentLoaded",
  () => main(),
  false
);
