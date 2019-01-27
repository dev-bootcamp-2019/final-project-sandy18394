module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                style: 'inline',
                sourceMap: true
            },
            dist: {
                files: {
                    'public/css/bootstrap.css': 'sass/custom/bootstrap.scss'
                }
            }
        },
        watch: {
            js: {
                files: ['src/dumed.js','ngsrc/**/*.js'],
                tasks: ['concat']
            },
            sass: {
                files: [
                    'sass/**/*.scss'
                ],
                tasks: ['sass']
            }

        },
        concat: {
            options: {
                separator: "\n\n",
                sourceMap: true,
                sourceMapName: 'public/js/fg-<%=pkg.version%>.js.map',
                sourceMapStyle: "link",
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: ['src/dumed.js',
                    'ngsrc/**/*.js'
                ],
                dest: 'public/js/fg-<%=pkg.version%>.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'public/js/fg-<%=pkg.version%>.min.js': ['public/js/fg-<%=pkg.version%>.js']
                }
            }
        },
        /*copy: {
            main: {
                files: [
                    { expand: true, flatten: true, src: ['bower_components/textAngular/dist/textAngular.css'], dest: 'public/css/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/select2/dist/css/select2.min.css'], dest: 'public/css/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/font-awesome/css/font-awesome.min.css'], dest: 'public/css/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css'], dest: 'public/css/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css.map'], dest: 'public/css/', filter: 'isFile' },

                    { expand: true, flatten: true, src: ['bower_components/angular/angular.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/jquery/dist/jquery.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/moment/min/moment.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-ui-router/release/angular-ui-router.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-animate/angular-animate.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-animate/angular-animate.min.js.map'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap/ui-bootstrap.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js.map'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar.min.js.map'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap-calendar/demo/demo.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/bootstrap/dist/js/bootstrap.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-touch/angular-touch.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-xeditable/dist/js/xeditable.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-route/angular-route.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/textAngular/dist/textAngular-rangy.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/textAngular/dist/textAngular-sanitize.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/textAngular/dist/textAngular.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-smoothscroll/dist/scripts/bb15da28.scripts.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-bootstrap/ui-bootstrap.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/select2/dist/js/select2.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-strap/dist/angular-strap.min.js'], dest: 'public/js/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['bower_components/angular-strap/dist/angular-strap.tpl.min.js'], dest: 'public/js/', filter: 'isFile' }
                ]
            }
        }*/
    });

    // grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-svg-sprite');


    //tasks
    //grunt.registerTask('default', ['sass']);
    grunt.registerTask('uglify', ['concat', 'uglify']);
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('copyLibs', ['copy']);

}