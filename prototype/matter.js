let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;

// create an engine
let engine = Engine.create();
let idRAF = null;

function init() {
    let numm = Math.random();
    $('canvas').remove();

    cancelAnimationFrame(idRAF);
    let width = 800;
    let height = 600;
    let offset = 100;
    // module aliases

    engine.events = {};
    World.clear(engine.world);
    Engine.clear(engine);

    engine = Engine.create();

    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;
    let mouseConstraint = MouseConstraint.create(engine);
    World.add(engine.world, mouseConstraint);

    // create a renderer
    let render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            wireframes: false,
            background: 'transparent',
            width: width,
            height: height,
            showDebug: false,
            showBroadphase: false,
            showBounds: false,
            showVelocity: false,
            showCollisions: false,
            showSeparations: false,
            showAxes: false,
            showPositions: false,
            showAngleIndicator: false,
            showIds: false,
            showShadows: false,
            showVertexNumbers: false,
            showConvexHulls: false,
            showInternalEdges: false,
            showMousePosition: false
        }
    });

    let topRightCorner = Bodies.polygon(650, offset, 3, 200, {
        isStatic: true,
        label: 'trc',
        render: {
            fillStyle: '#000000'
        }
    });

    Matter.Body.rotate(topRightCorner, 15);

    let topLeftCorner = Bodies.polygon(offset, offset, 3, 200, {
        isStatic: true,
        label: 'trc',
        render: {
            fillStyle: '#000000'
        }
    });

    Matter.Body.rotate(topLeftCorner, 24);

    // create container
    World.add(engine.world, [
        Bodies.rectangle(width / 2, offset, width, 10, {
            isStatic: true,
            render: {
                fillStyle: '#e2e2e2'
            }
        }),
        Bodies.rectangle(offset, height / 2, 10, height, {
            isStatic: true,
            render: {
                fillStyle: '#e2e2e2'
            }
        }),
        Bodies.rectangle(width - offset, height / 2, 10, height, {
            isStatic: true,
            render: {
                fillStyle: '#e2e2e2'
            }
        }),
        topRightCorner,
        topLeftCorner
    ]);

    for (let i = 0; i < 5; i++) {
        let radius = 50;
        World.add(
            engine.world,
            Bodies.circle(width / 2, height / 2, radius, {
                render: {
                    fillStyle: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'][
                        Math.round(Math.random() * 3)
                    ]
                }
            })
        );
    }

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

    let inc = 0;

    engine.world.gravity.y = -1;
    engine.world.gravity.x = 0;
}
init();

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

$(window).on(
    'resize',
    debounce(
        function() {
            init();
        }.bind(this),
        200
    )
);
