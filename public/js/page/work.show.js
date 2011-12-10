define(function(require , exports , module){
	
	var $ = require('jquery'), 
		Writer = require('sufa/Writer');
		
		
	var defaultColor = '0,0,0',
		writer = null;
		
	module.exports = {
		init: function(id, options){
			var testCanvas = document.getElementById("testCanvas"); 
            
            if (!testCanvas.getContext){   
                $('#goTop').show();    
                return;
            }
            $('#goTop').show();
            this.id = id;
            this.opts = $.extend({showDelay:2000},options);
            
            this._initPlayTool();
		},
		_initPlayTool : function(){
			var self =this;
            $('#play').show();
			$('#play').bind('click',function(){
                
                if(!writer) {
                    self._initWriter();
                    return;
                }
                    
				if(!self.isPlayIning) {
					self.isPlayIning = true;
					writer.playBack(function(){
						self.isPlayIning = false;
					});
				}
			});
		},
        _initWriter : function(){
            $('#workPlace').remove();
               	
            var testCanvas = document.getElementById("testCanvas"),self = this;
            if (!testCanvas.getContext){
                 window.location.href="http://"+Global_Site.domain+'/notSupport';
                 return;
            }
			writer = new Writer(this.id,this.opts);
			writer.initialize();
			
			this.isPlayIning = false;
			setTimeout(function(){
				self.isPlayIning = true;             
				writer.play(self.opts.history , function(){
					self.isPlayIning = false;		
				});
			},this.opts.showDelay);
        }
	}
});
