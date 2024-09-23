const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
  PanelBody,
  ExternalLink,
  SelectControl,
  TextControl
} = wp.components;
const { withSelect } = wp.data;
const {
  ServerSideRender,
  InspectorControls
} = wp.editor;
const { Fragment } = wp.element;

const icon = "search";

registerBlockType("searchwp/modal-form", {
  title: __("Modal Form", "searchwp-modal-search-form"),
  description: (
    <Fragment>
      <p>{__("Insert a modal search form", "searchwp-modal-search-form")}</p>
      <ExternalLink
        className={_SEARCHWP_MODAL_FORM_DATA.searchwp ? "hidden" : ""}
        href="https://searchwp.com/?utm_source=wordpressorg&amp;utm_medium=link&amp;utm_campaign=modalform&amp;utm_content=menuitem"
      >
        {__("Improve your search with SearchWP", "searchwp-modal-search-form")}
      </ExternalLink>
    </Fragment>
  ),

  icon,
  category: "searchwp",

  keywords: [
    __("modal", "searchwp-modal-search-form"),
    __("search", "searchwp-modal-search-form"),
    __("overlay", "searchwp-modal-search-form")
  ],

  attributes: {
    engine: {
      type: "string",
      default: "default"
    },
    template: {
      type: "string",
      default: "Default"
    },
    text: {
      type: "string",
      default: __("Search", "searchwp-modal-search-form")
    },
    type: {
      type: "string",
      default: "link"
    }
  },

  edit: withSelect(function(select) {
    return {
      post_id: select("core/editor").getCurrentPostId()
    };
  })(function({ post_id, setAttributes, attributes, isSelected }) {
    const { engine, template, text, type } = attributes;
    return (
      <div>
        <InspectorControls>
          <PanelBody initialOpen={true}>
            <TextControl
              label={__("Text", "searchwp-modal-search-form")}
              value={text}
              onChange={value => {
                setAttributes({ text: value });
              }}
            />

            <SelectControl
              label={__("Template", "searchwp-modal-search-form")}
              value={`${template}`}
              options={_SEARCHWP_MODAL_FORM_DATA.templates}
              onChange={value => {
                setAttributes({ template: value });
              }}
            />

            <SelectControl
              label={__("Type", "searchwp-modal-search-form")}
              value={`${type}`}
              options={[
                {
                  label: __("Link", "searchwp-modal-search-form"),
                  value: "link"
                },
                {
                  label: __("Button", "searchwp-modal-search-form"),
                  value: "button"
                }
              ]}
              onChange={value => {
                setAttributes({ type: value });
              }}
            />
          </PanelBody>
        </InspectorControls>

        <ServerSideRender
          block="searchwp/modal-form"
          attributes={{ engine, template, text, type }}
        />
      </div>
    );
  }),

  save: function() {
    return null;
  }
});
