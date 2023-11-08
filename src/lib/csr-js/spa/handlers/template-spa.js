const handlerTemplate = (data = appData.pages.current) => {
  switch (data.template){
    case 'home': renderHome();break;
    case 'collection': renderCollection();break;
    case 'content': renderContent();break;
  }
}