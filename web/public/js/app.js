requirejs.config({
    baseUrl: "/assets/js/lib",
    paths: {
        'app'      : '../app',
        'jquery'   : ['//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min','jquery'],
        'd3'       : ['//cdnjs.cloudflare.com/ajax/libs/d3/2.10.0/d3.v2.min', '../../vendor/d3/d3.v2.min'],
        'nvd3'     : '../../vendor/nvd3/nv.d3.min'
    },
    shim: {
        'd3'       : {
            exports: 'd3'
        },
        'nvd3'     : {
            exports : 'nv',
            deps    : ['d3']
        }
    }
});

requirejs(['app/main']);