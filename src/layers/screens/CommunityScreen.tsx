// Layers - Screens - Community Screen (Config-Driven)
// Uses emojis for reliable icon rendering

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import { useStore, selectCommunityPosts, selectCommunityChannels, selectUser } from '@/state/store';
import { CONTENT } from '@/config/content';
import { colors, typography, spacing, borderRadius } from '@/config/theme';

export const CommunityScreen: React.FC = () => {
  const posts = useStore(selectCommunityPosts);
  const channels = useStore(selectCommunityChannels);
  const user = useStore(selectUser);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{CONTENT.COMMUNITY.title}</Text>
            <Text style={styles.subtitle}>{CONTENT.COMMUNITY.subtitle}</Text>
          </View>
          <Image
            source={{ uri: user?.avatar || 'https://i.pravatar.cc/150?u=kate' }}
            style={styles.avatar}
          />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={CONTENT.COMMUNITY.searchPlaceholder}
            placeholderTextColor={colors.text.muted}
          />
        </View>

        {/* Channels */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.channelsScroll}
          contentContainerStyle={styles.channelsContainer}
        >
          <TouchableOpacity style={styles.addChannel}>
            <View style={styles.addChannelIcon}>
              <Text style={styles.addChannelIconText}>+</Text>
            </View>
            <Text style={styles.addChannelText}>{CONTENT.COMMUNITY.addChannel}</Text>
          </TouchableOpacity>
          {channels.map((channel) => (
            <TouchableOpacity key={channel.id} style={styles.channelItem}>
              <Image source={{ uri: channel.avatar }} style={styles.channelAvatar} />
              <Text style={styles.channelName} numberOfLines={1}>
                {channel.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Write Post Input */}
        <View style={styles.writePostContainer}>
          <Image
            source={{ uri: user?.avatar || 'https://i.pravatar.cc/150?u=kate' }}
            style={styles.writePostAvatar}
          />
          <TextInput
            style={styles.writePostInput}
            placeholder={CONTENT.COMMUNITY.writeSomething}
            placeholderTextColor={colors.text.muted}
          />
        </View>

        {/* Posts Feed */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <Image source={{ uri: post.author.avatar }} style={styles.postAuthorAvatar} />
              <View style={styles.postAuthorInfo}>
                <Text style={styles.postAuthorName}>{post.author.name}</Text>
                <Text style={styles.postHandle}>
                  {post.author.handle} · {post.timestamp}
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.postMenu}>⋮</Text>
              </TouchableOpacity>
            </View>

            {/* Post Content */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Post Image */}
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}

            {/* Post Stats */}
            <View style={styles.postStats}>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>❤️</Text>
                <Text style={styles.statText}>{post.likes}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>💬</Text>
                <Text style={styles.statText}>{post.comments}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>👁</Text>
                <Text style={styles.statText}>{post.views}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    color: colors.text.muted,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
  },
  channelsScroll: {
    marginBottom: spacing.md,
  },
  channelsContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  addChannel: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  addChannelIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addChannelIconText: {
    fontSize: 28,
    color: colors.primary[600],
    fontWeight: 'bold',
  },
  addChannelText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  channelItem: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  channelAvatar: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
  },
  channelName: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    maxWidth: 56,
    textAlign: 'center',
  },
  writePostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.cardAlt,
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
  },
  writePostAvatar: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  writePostInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
  },
  postCard: {
    backgroundColor: colors.background.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius['2xl'],
    padding: spacing.lg,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  postAuthorAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthorName: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
  },
  postHandle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.muted,
  },
  postMenu: {
    fontSize: 24,
    color: colors.text.muted,
    paddingHorizontal: spacing.sm,
  },
  postContent: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.background.cardAlt,
  },
  postStats: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statIcon: {
    fontSize: 16,
    color: colors.text.muted,
  },
  statText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.muted,
  },
});