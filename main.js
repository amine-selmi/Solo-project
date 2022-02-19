$('.results').hide();
$(function(){
    var app = {
        player: '',
        cards: [1,1,2,2,3,3],
        counter : 6,
        init: function(){
           
            this.shuffle();
            $('.start-game').on('click', function(e) {
				app.gatherData(e);
			});
            

        },
        shuffle: function(){
            var random=0;
            var permut=0;
            console.log(this.cards);
            for(var i=0;i<this.cards.length;i++){
                random = Math.round(Math.random()*i)
                temp = this.cards[i]
                this.cards[i]= this.cards[random]
                this.cards[random]= temp
                $('.cards').append('<div class="card unmatched"></div>');
            }
            $('.card').each(function(index){
				$(this).attr('data-card', app.cards[index]);
			});
            console.log(this.cards);
        },
        gatherData: function(e){
            e.preventDefault();
			if($('.player-name').val() !== '') {
				app.player = $('.player-name').val();
				app.event();
				app.startTime = new Date();
				console.log(app.startTime);
				console.log(app.player);
			} else {
				$('input[type=text]').addClass('shake');
				setTimeout(function() { $('input[type=text]').removeClass('shake'); }, 500);
				return false;
			}
			$('.menu').fadeOut();
        },
        event: function() {
			$('.card').on('click', function() {
                $('.card').on('click',function(){
                    $(this).html("<p class = 'centerr'>"+$(this).attr('data-card')+"</p>" )
                })
                $('centerr').show()
				app.flipCard($(this));
			});
		},
        flipCard: function(card){
            console.log($('.card'));
            card.addClass("selected");

            if($('.selected').length === 2) {
				app.checkMatch();
			}
        },
        checkMatch: function(){
            if($('.selected').first().data('card') === $('.selected').last().data('card')) {
				setTimeout(function() {
					$('.selected').each(function() {
                        app.counter-=1
                        console.log(app.counter)
						$(this).removeClass('unmatched selected').css({'background':''}).animate({ opacity: 0 },{duration: 1000});
						app.checkWin()
					});
				}, 1000);
			} else {
				setTimeout(function(){
					$('.selected').each(function() {
						$(this).html('').removeClass('selected').css({'background':''});
					});
				}, 1000);
                app.checkWin()
			}
        },
        checkWin: function() {
            console.log($('.selected').length)
            if(app.counter ===0 ){
				$('.results').show();
				$('.results').css('display','block !important')
				var endTime = new Date();
				var time = Math.round((endTime - app.startTime)/1000);
				$('.results .time').text('Your time was '+time+' seconds');
            }
			
		},


    }
    $('.start-game').on('click',function(){
        $('.content').removeClass('hide')
        $('.menu').fadeOut();
    })
    app.init();
});