const handlerTemplate = (data = appData.pages.current) => {
  console.log('templateHandler called');

  switch (data.template){
    case 'home': renderHome();break;
    case 'collection': renderCollection();break;
    case 'content': renderContent();break;
  }
}