/* global _SEARCHWP */

( function($) {

    'use strict';

    const app = {

        /**
         * Init.
         *
         * @since 0.5.1
         */
        init: () => {

            $( app.ready );
        },

        /**
         * Document ready
         *
         * @since 0.5.1
         */
        ready: () => {

            app.events();
        },

        /**
         * Extension page events.
         *
         * @since 0.5.1
         */
        events: () => {

            const $notificationsPanel = $( '.searchwp-notifications-panel-wrapper' );

            const showNotificationsPanelOnHash = () => {
                if ( window.location.hash === '#notifications' ) {
                    $notificationsPanel.show();
                }
            };

            showNotificationsPanelOnHash();

            $( window ).on( 'hashchange', showNotificationsPanelOnHash );

            $( '.searchwp-admin-menu-notification-indicator' ).parent()
                .on( 'click', showNotificationsPanelOnHash );

            $( '#swp-notifications-page-header-button' )
                .on( 'click', () => $notificationsPanel.show() );

            $( '.searchwp-notifications-panel__close' )
                .on( 'click', () => $notificationsPanel.hide() );

            $( '.searchwp-notifications-backdrop' )
                .on( 'click', () => $notificationsPanel.hide() );

            $( '.searchwp-notification-dismiss' ).on( 'click', app.dismiss );
        },

        /**
         * Dismiss notification.
         *
         * @since 0.5.1
         */
        dismiss: ( event ) => {

            const $el = $( event.target );

            // AJAX call - update option.
            const data = {
                _ajax_nonce: _SEARCHWP.nonce,
                action: _SEARCHWP.prefix + 'notification_dismiss',
                id: $el.data( 'id' ),
            };

            const $notification = $el.closest( '.searchwp-notifications-notification' );

            const handleResponse = ( res ) => {
                if ( res.success ) {
                    $notification.fadeOut(
                        100,
                        () => {
                            $notification.remove();
                            app.updateNotificationCount();
                        }
                    );
                }
            };

            $.post( ajaxurl, data, handleResponse );
        },

        /**
         * Update notification count in various places or reload the page if no notifications left.
         *
         * @since 0.5.1
         */
        updateNotificationCount: () => {

            const notificationsCount = $( '.searchwp-notifications-panel__notifications' ).children().length;

            $( '.searchwp-branding-bar__actions-button-count' ).text( notificationsCount );
            $( '.searchwp-notifications-panel__header span span' ).text( notificationsCount );

            if ( notificationsCount !== 0 ) {
                return;
            }

            if ( window.location.hash ) {
                window.location.hash = '';
            }

            location.reload();
        }
    };

    app.init();

    window.searchwp = window.searchwp || {};

    window.searchwp.ModalFormAdminNotifications = app;

}( jQuery ) );
