ProtoGraph.initDataApp = function () {
    var x = new ProtoGraph.Card.toMaps();

    x.init({
        selector: document.querySelector('#card-list-div'),
        dataURL: 'https://cdn.protograph.pykih.com/7613998bc8dd2fc20f94/data.json',//streams.Grid.url,//
        chartOptions: {
            height: 700,
            defaultCircleColor: ProtoGraph.site['house_colour']
        },
        filterConfigurationJSON: {
            colors: {
                house_color: ProtoGraph.site['house_colour'],
                text_color: '#343434',
                active_text_color: ProtoGraph.site['house_colour'],
                filter_summary_text_color: ProtoGraph.site['reverse_font_colour']
            },
            selected_heading: 'FILTERS',
            reset_filter_text: 'Reset'
        },
        filters: [
            {
                "alias": "Time required",
                "propName": "subtitle"
            }
        ]
    });
    x.renderLaptop();
}