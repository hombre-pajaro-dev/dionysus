module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['features/support/**/*.ts', 'features/step_definitions/**/*.ts'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    publishQuiet: true,
  },
}
