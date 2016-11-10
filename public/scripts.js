function getAllPuppies() {
  return fetch('/api/puppies')
    .then(r => r.json());
}

function adoptPuppy(payload) {
  console.log(JSON.stringify(payload));
  return fetch('/api/puppies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

function likePuppy(e) {
  // Implement liking a puppy here.
  console.log(`/api/puppies/${e}`);
  return fetch(`/api/puppies/${e}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
    // body: JSON.stringify(payload)
  });
}

function abandonPuppy(e) {
  // Implement abandoning a puppy here :(
  console.log(`DELETING - /api/puppies/${e}`);
  return fetch(`/api/puppies/${e}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
    // body: JSON.stringify(payload)
  });
}

function renderPuppies(puppies) {
  const $container = $('.adopted-puppies').empty();
  for (let i = 0; i < puppies.length; i += 1) {
    const $newPuppy = $('.puppy-template').clone();

    $newPuppy.removeClass('puppy-template')
      .addClass('puppy')
      .find('.name').text(puppies[i].name);

    $newPuppy
      .find('.likes').text(puppies[i].likes);

    $newPuppy
      .find('.abandon-puppy')
      .prop('id', puppies[i].id);

    $newPuppy
      .find('.puppy-picture img')
      .attr('src', puppies[i].url);

    // You should add a button for liking here
    $newPuppy
      .find('.likeButton')
      .attr('name', puppies[i].id)

    $newPuppy
      .find('.abandonButton')
      .attr('name', puppies[i].id)

    // you should add a button for abandoning here

    $container.append($newPuppy);
  }
}

function registerLikeButtonHandler() {
  // implement like button listener here.
  $(".adopted-puppies").on('click', ".likeButton" , (e) => {
    likePuppy(e.currentTarget.name);
    getAllPuppies().then(renderPuppies);
  })
}

function registerAbandonButtonHandler() {
  // implement abandon button listener here. :(
  $(".adopted-puppies").on('click', ".abandonButton" , (e) => {
    abandonPuppy(e.currentTarget.name);
    getAllPuppies().then(renderPuppies);
  })
}

function registerFormHandler() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const $form = $(this);
    const puppy = {
      name: $form.find('[name=name]').val(),
      url: $form.find('[name=url]').val()
    };

    adoptPuppy(puppy).then(() => {
      getAllPuppies().then(renderPuppies);
    });
  });
}

$(() => {
  registerFormHandler();
  registerAbandonButtonHandler();
  registerLikeButtonHandler();
  getAllPuppies().then(renderPuppies);
});
