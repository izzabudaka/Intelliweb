exports.Card = () => {
    var elements = [];

    var toJson = () => {
        return JSON.stringify(elements);
    };

    var addTitle = (title,colour) => {
        elements.push({
            type: 0,
            payload: {
                text: title,
                colour: colour
            }
        })
    };

    var addSubtitle = (subtitle, title, colour) => {
        elements.push({
            type: 1,
            payload: {
                title: title,
                subtitle: subtitle,
                colour: colour
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

    var addButton = (url, name, background, colour) => {
        elements.push({
            type: 3,
            payload: {
                url: url,
                name: name,
                background: background,
                colour: colour
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

    var addColor = (color) => {
        elements.push({
            type: 5,
            payload: {
                color: color
            }
        })
    };

    return {
        addColor: addColor,
        toJson: toJson,
        elements: elements,
        addTitle: addTitle,
        addSubtitle: addSubtitle,
        addImage: addImage,
        addButton: addButton,
        addGraph: addGraph
    };
};