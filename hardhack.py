from jinja2 import Environment, PackageLoader, select_autoescape
import os
import yaml

if __name__ == "__main__":
    # this code depends on the name of this python file -- do NOT change it!
    env = Environment(
        loader=PackageLoader("hardhack"),
        autoescape=select_autoescape()
    )

    with open('context.yaml', 'r') as f:
        context = yaml.safe_load(f)

    # TODO: move this to a config file
    excluded_templates = ["base.html"]

    # assume we are in proj root; get the list of template filenames from /templates
    dirname = os.path.dirname(__file__)
    template_dir_path = os.path.join(dirname, "templates/")
    templates = [f for f in os.listdir(template_dir_path) 
                 if os.path.isfile(os.path.join(template_dir_path, f)) and f not in excluded_templates]
    for template_name in templates:
        template = env.get_template(template_name)
        with open(template_name, 'w', encoding="utf-8") as f:
            f.write(template.render(context))