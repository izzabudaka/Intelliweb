exports.Card = () => {
    var elements = [];

    var toJson = () => {
        return JSON.stringify(elements);
    };

    var addTitle = (title) => {
        elements.push({
            type: 0,
            payload: {
                title: title
            }
        })
    };

    var addSubtitle = (subtitle) => {
        elements.push({
            type: 1,
            payload: {
                subtitle: subtitle
            }
        })
    };

    var addImage= (url) => {
        elements.push({
            type: 2,
            payload: {
                url: url
            }
        })
    };

    var addButton = (url, name) => {
        elements.push({
            type: 3,
            payload: {
                url: url,
                name: name
            }
        })
    };

    var addGraph = (data) => {
        elements.push({
            type: 4,
            payload: {
                data: data
            }
        })
    };

    return {
        toJson: toJson,
        addTitle: addTitle,
        addSubtitle: addSubtitle,
        addImage: addImage,
        addButton: addButton,
        addGraph: addGraph
    };
};